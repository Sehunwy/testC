/**
 * @module MobileApp\components
 */
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import BaiduMap from "@/plugins/map";
import format from "@/plugins/format";
import common from "@/MobileApp/utils/common";

declare var BMAP_STATUS_SUCCESS;
declare var BMAP_STATUS_UNKNOWN_LOCATION;
declare var BMAP_STATUS_PERMISSION_DENIED;
declare var BMAP_STATUS_TIMEOUT;
declare var BMAP_ANCHOR_TOP_LEFT;
declare var BMap_Symbol_SHAPE_POINT;
declare var BMAP_NAVIGATION_CONTROL_ZOOM;
declare var BMap_Symbol_SHAPE_CIRCLE;

@Component({
  filters: {
    formatDistance(distance) {
      return format.formatDistance(distance);
    }
  }
})
export default class Location extends Vue {
  [x: string]: any;
  private defaultCenter = { lng: 104.06792346, lat: 30.67994285 };
  private defaultZoom = 17;
  private circleRadius = 200;
  private nearbySearchKeys = ["公司", "餐厅"];
  private BMap;
  private currentMap;
  private allowLocation = false;
  private isBusyLocation = false;
  private currentLocationPoint = {};
  private currentLocationAddress = {} as IndexObject;
  private currentLocationAddressDesc = "";
  private isBusyLocalSearch = false;
  private nearbyLocations = [] as IndexObject;
  private selectedRadio = "-1";
  private selectedLocation = {} as IndexObject;
  private indicateMarker;

  @Prop({ default: "定位" }) title!: string;
  @Prop({ default: "" }) rightText!: string;

  mounted() {
    BaiduMap.init()
      .then(BMap => {
        this.BMap = BMap;
        if (!this.BMap) {
          return;
        }
        this.currentMap = this.createBaiduMap("mapContainer");
        let navigationControl = this.createNavigationControl();
        this.currentMap.addControl(navigationControl);
        this.allowLocation = true;
        this.getGeolocation();
      })
      .catch(errorMsg => {
        console.log(errorMsg);
      });
  }

  private createBaiduMap(containerName) {
    let map = new this.BMap.Map(containerName);
    map.disableDoubleClickZoom();
    map.enableScrollWheelZoom();
    map.centerAndZoom(
      new this.BMap.Point(this.defaultCenter.lng, this.defaultCenter.lat),
      this.defaultZoom
    );
    return map;
  }

  private createNavigationControl() {
    let navigationControl = new this.BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      type: BMAP_NAVIGATION_CONTROL_ZOOM,
      enableGeolocation: false
    });
    return navigationControl;
  }

  private getGeolocation() {
    if (!this.currentMap || !this.BMap) {
      return;
    }
    this.isBusyLocation = true;
    let geolocation = new this.BMap.Geolocation();
    geolocation.enableSDKLocation();
    geolocation.getCurrentPosition(
      res => {
        this.isBusyLocation = false;
        let status = geolocation.getStatus();
        if (status === BMAP_STATUS_SUCCESS) {
          this.successedGetLocation(res);
        } else {
          this.failedGetLocation(status);
        }
      },
      { enableHighAccuracy: true }
    );
  }

  private successedGetLocation(res) {
    this.currentMap.clearOverlays();
    this.indicateMarker = null;
    let currentPoint = new this.BMap.Point(res.point.lng, res.point.lat);
    this.addVectorMarker(currentPoint);
    this.addCircle(currentPoint);
    this.currentMap.centerAndZoom(currentPoint, this.defaultZoom);
    this.searchNearby(currentPoint);
    this.currentLocationPoint = res.point;
    this.currentLocationAddress = res.address;
    this.currentLocationAddressDesc = this.generateAddressDesc(res.address);
    this.selectedRadio = "-1";
    this.onRadioChange(this.selectedRadio);
  }

  private generateAddressDesc(address) {
    let result = "";
    if (!address) {
      return result;
    }
    if (address.city) {
      result += address.city;
    }
    if (address.district) {
      result += address.district;
    }
    if (address.street) {
      result += address.street;
    }
    if (address.street_number) {
      result += address.street_number;
    }
    return result;
  }

  private failedGetLocation(status) {
    let errorMessage = "";
    if (status === BMAP_STATUS_UNKNOWN_LOCATION) {
      errorMessage = "位置结果未知!";
    } else if (status === BMAP_STATUS_PERMISSION_DENIED) {
      errorMessage = "没有获取位置权限!";
    } else if (status === BMAP_STATUS_TIMEOUT) {
      errorMessage = "请求超时,请重试!";
    } else {
      errorMessage = "未知错误" + status;
    }
    common.toastMessage(errorMessage, 4000);
  }

  private addVectorMarker(point) {
    // 设置marker图标为水滴
    let vectorMarker = new this.BMap.Marker(point, {
      // 指定Marker的icon属性为Symbol
      icon: this.createVectorIcon()
    });
    vectorMarker.setTop(true);
    this.currentMap.addOverlay(vectorMarker);
    return vectorMarker;
  }

  private createVectorIcon() {
    let vectorIcon = new this.BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
      scale: 1.5, // 图标缩放大小
      fillColor: "#3fcc8e", // 填充颜色
      fillOpacity: 0.8 // 填充透明度
    });
    return vectorIcon;
  }

  private addMarker(point) {
    let marker = new this.BMap.Marker(point);
    marker.setZIndex(1);
    this.currentMap.addOverlay(marker);
    return marker;
  }

  private addCircle(point) {
    let circle = new this.BMap.Circle(point, this.circleRadius, {
      strokeColor: "green",
      strokeWeight: 1,
      strokeOpacity: 0.5
    });
    this.currentMap.addOverlay(circle);
    return circle;
  }

  private searchNearby(point) {
    this.isBusyLocalSearch = true;
    let local = new this.BMap.LocalSearch(point, {
      renderOptions: {
        autoViewport: false,
        selectFirstResult: false
      },
      onSearchComplete: res => {
        this.isBusyLocalSearch = false;
        this.nearbyLocations = [];
        if (res) {
          console.log(res);
          res.forEach(element => {
            // 有时候这个属性是Dq??
            element.Gq.forEach(location => {
              let distance = BaiduMap.getDistance(
                this.currentLocationPoint,
                location.point
              );
              location.distance = distance.toFixed(0);
              this.nearbyLocations.push(location);
              this.addMarker(location.point);
            });
          });
          this.nearbyLocations.sort((a, b) => {
            return a.distance - b.distance;
          });
        }
      }
    });
    local.searchNearby(this.nearbySearchKeys, point, this.circleRadius);
  }

  private onRadioChange(selectedName) {
    if (selectedName === "-1") {
      this.selectedLocation = {
        point: this.currentLocationPoint,
        province: this.currentLocationAddress.province,
        city: this.currentLocationAddress.city,
        address: this.currentLocationAddressDesc
      };
    } else if (selectedName >= 0) {
      let location = this.nearbyLocations[selectedName];
      this.selectedLocation = {
        point: location.point,
        province: location.province,
        city: location.city,
        address: location.address
      };
    }
    this.resetIndicateMarker(this.selectedLocation.point);
    this.selectionChanged();
  }

  private resetIndicateMarker(point) {
    if (!point) {
      return;
    }
    if (!this.indicateMarker) {
      this.indicateMarker = new this.BMap.Marker(point, {
        // 指定Marker的icon属性为Symbol
        icon: new this.BMap.Symbol(BMap_Symbol_SHAPE_CIRCLE, {
          scale: 5, // 图标缩放大小
          fillColor: "#3fcc8e",
          strokeColor: "#3fcc8e", // 填充颜色
          fillOpacity: 0.9 // 填充透明度
        })
      });
      this.indicateMarker.setZIndex(0);
      this.currentMap.addOverlay(this.indicateMarker);
    }
    this.indicateMarker.setPosition(point);
    this.currentMap.panTo(point);
  }

  @Emit("goBack")
  private goBack() {}

  private confirmComplete() {
    if (!this.selectedLocation || !this.selectedLocation.point) {
      common.toastMessage("未选择当前位置!", 2000);
      return;
    }
    this.locationCompleted();
  }

  @Emit("locationCompleted")
  private locationCompleted() {
    return this.selectedLocation;
  }

  @Emit("selectionChanged")
  private selectionChanged() {
    return this.selectedLocation;
  }
}
