/**
 * @module MobileApp\components
 */

import Vue from "vue";
import { Component, Prop, Watch, Emit, Model } from "vue-property-decorator";
import { IndexObject } from "@/types";
import { Toast } from "vant";
import common from "@/MobileApp/utils/common";
import lrz from "lrz";
import { API_BASE_URL } from "@/utils/conf";
import axios from "axios";
import AppCookies from "../appCookies";
import format from "@/plugins/format";
import BaiduMap from "@/plugins/map";

@Component
export default class CrmPhoto extends Vue {
  [x: string]: any;
  private isBusyUpload = false;
  private isBusyDelete = false;
  private picWidth = 75;
  private picHeight = 90;
  private largeUrl = API_BASE_URL + "crmImage/";
  private thumbUrl = API_BASE_URL + "crmImage/thumb/";
  private locationDesc = "";

  @Prop({ default: "照片" }) headerTitle!: string;
  @Prop({ default: false }) readOnly!: boolean;
  @Prop({ default: true }) allowPickAblum!: boolean;
  @Prop({ default: true }) showHeader!: boolean;

  @Prop({ default: "" }) imageCategory!: string;
  @Prop({ default: "" }) customerName!: string;
  @Prop({ default: "" }) businessId!: string;

  @Model("photoChange", { type: Array }) photoIds!: string[];

  @Emit("photoChange")
  private raisePhotoChange() {
    return this.photoIds;
  }

  @Watch("photoIds")
  onPhotoDatasChange(newVal, oldVal) {
    this.$previewRefresh();
  }

  mounted() {
    this.getGeolocation();
  }

  private onViewPhoto() {
    this.toastLoading("图片加载中...");
    this.$preview.on("imageLoadComplete", (e, item) => {
      Toast.clear();
    });
  }

  private getGeolocation() {
    if (this.readOnly) {
      return;
    }
    BaiduMap.getGeolocation()
      .then(res => {
        this.locationDesc = BaiduMap.generateAddressDesc(res.address);
      })
      .catch(errorMsg => {
        console.log(errorMsg);
      });
  }

  private onPickPhoto() {
    if (this.readOnly) {
      return;
    }
    if (this.allowPickAblum) {
      this.pickAblumInput();
    } else {
      this.pickCameraInput();
    }
  }

  private pickCameraInput() {
    if (this.readOnly) {
      return;
    }
    let cameraInput = this.$refs.cameraInput as IndexObject;
    return cameraInput.click();
  }

  private pickAblumInput() {
    if (this.readOnly || !this.allowPickAblum) {
      return;
    }
    let ablumInput = this.$refs.ablumInput as IndexObject;
    return ablumInput.click();
  }

  private onCameraInputChange() {
    let cameraInput = this.$refs.cameraInput as IndexObject;
    if (!cameraInput.files || cameraInput.files.length === 0) {
      common.toastMessage("未选择上传的照片!");
      return;
    }
    let bodyFormData = new FormData();
    bodyFormData.append("Category", this.imageCategory);
    bodyFormData.append("CustomerName", this.customerName);
    let currentDate = format.formatDateTime(new Date(), "yyyy-MM-dd hh:mm:ss");
    bodyFormData.append("TakeTime", currentDate);
    bodyFormData.append("LocationDesc", this.locationDesc);
    // 通过append向form对象添加数据
    bodyFormData.append(
      "picture",
      cameraInput.files[0],
      cameraInput.files[0].name
    );
    this.uploadPhoto(bodyFormData, () => {
      // 解决上传相同照片操作失效问题
      cameraInput.value = null;
    });
  }

  private onAblumInputChange() {
    let ablumInput = this.$refs.ablumInput as IndexObject;
    if (!ablumInput.files || ablumInput.files.length === 0) {
      common.toastMessage("未选择上传的照片!");
      return;
    }
    let bodyFormData = new FormData();
    bodyFormData.append("Category", this.imageCategory);
    bodyFormData.append("CustomerName", this.customerName);
    let currentDate = format.formatDateTime(new Date(), "yyyy-MM-dd hh:mm:ss");
    bodyFormData.append("TakeTime", currentDate);
    bodyFormData.append("LocationDesc", this.locationDesc);
    // 通过append向form对象添加数据
    for (let i = 0; i < ablumInput.files.length; i++) {
      bodyFormData.append(
        "picture" + i,
        ablumInput.files[i],
        ablumInput.files[i].name
      );
    }
    this.uploadPhoto(bodyFormData, () => {
      // 解决上传相同照片操作失效问题
      ablumInput.value = null;
    });
  }

  private uploadPhoto(formData, finallyCallback) {
    if (!formData) {
      return;
    }
    let config = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    this.isBusyUpload = true;
    this.toastLoading("正在上传...");
    axios
      .post(API_BASE_URL + "crmAppUpload", formData, config)
      .then(res => {
        if (!this.photoIds) {
          this.photoIds = [];
        }
        res.data.forEach(element => {
          this.photoIds.push(element);
        });
        this.raisePhotoChange();
      })
      .catch(res => {
        common.toastMessage("上传照片失败!" + res);
      })
      .finally(() => {
        Toast.clear();
        this.isBusyUpload = false;
        finallyCallback();
      });
  }

  private confirmDeletePhoto(index) {
    if (this.readOnly) {
      return;
    }
    common
      .dialogConfirm("温馨提示", "请确认要删除此照片?")
      .then(() => {
        // on confirm
        this.deletePhoto(index);
      })
      .catch(() => {});
  }

  private deletePhoto(index) {
    if (!this.photoIds || this.photoIds.length === 0 || index < 0) {
      return;
    }
    let imageId = this.photoIds[index];
    let currentPersonId = AppCookies.instance.getPersonId();
    this.isBusyDelete = true;
    this.toastLoading("正在删除...");
    this.$Api
      .invoke({
        moduleName: "crm.basic.imageResourceService",
        className: "ImageResourceService",
        method: "delete",
        args: {
          personId: currentPersonId,
          id: imageId
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.photoIds.splice(index, 1);
          this.raisePhotoChange();
        } else {
          common.toastMessage("删除照片失败!" + res.data.error);
        }
      })
      .catch(res => {
        common.toastMessage("删除照片异常!" + res);
      })
      .finally(() => {
        Toast.clear();
        this.isBusyDelete = false;
      });
  }

  private toastLoading(msg) {
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: msg
    });
  }
}
