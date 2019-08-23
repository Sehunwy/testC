import "../assets/js/GeoUtils_min"

export default {
    init: function () {
        const AK = 'cxe5IvbUduawnAEdG2B8ChKLcSk94lqQ'
        const BMapURL = 'https://api.map.baidu.com/api?v=3.0&ak=' + AK + '&callback=onBMapCallback'
        return new Promise((resolve, reject) => {
            // 如果已加载直接返回
            if (typeof BMap !== 'undefined') {
                console.log('百度地图脚本已初始化...');
                resolve(BMap);
                return true;
            }
            // 百度地图异步加载回调处理
            window.onBMapCallback = function () {
                console.log('百度地图脚本初始化成功...');
                resolve(BMap);
            }
            // 插入script脚本
            let scriptNode = document.createElement('script');
            scriptNode.onerror = function () {
                reject("百度地图脚本加载失败!");
            };
            scriptNode.setAttribute('type', 'text/javascript');
            scriptNode.setAttribute('src', BMapURL);
            document.body.appendChild(scriptNode);
        })
    },
    getGeolocation() {
        var p = new Promise((resolve, reject) => {
            this.init().then(BMap => {
                let geolocation = new BMap.Geolocation();
                geolocation.enableSDKLocation();
                geolocation.getCurrentPosition(
                    res => {
                        let status = geolocation.getStatus();
                        if (status === BMAP_STATUS_SUCCESS) {
                            resolve(res);
                        } else {
                            let errorMsg = this.getGeolocationStatusMessage(status);
                            reject(errorMsg);
                        }
                    }, {
                        enableHighAccuracy: true,
                        timeout: 5000
                    }
                );
            }).catch(errorRes => {
                reject(JSON.stringify(errorRes));
            });
        });
        return p;
    },
    getGeolocationStatusMessage(status) {
        var statusMessage = "";
        if (status === BMAP_STATUS_SUCCESS) {
            statusMessage = "定位成功!";
        } else if (status === BMAP_STATUS_UNKNOWN_LOCATION) {
            statusMessage = "位置结果未知!";
        } else if (status === BMAP_STATUS_PERMISSION_DENIED) {
            statusMessage = "没有获取位置权限!";
        } else if (status === BMAP_STATUS_TIMEOUT) {
            statusMessage = "请求超时,请重试!";
        } else {
            statusMessage = "未知错误" + status;
        }
        return statusMessage;
    },
    getDistance(startPoint, endPoint) {
        return BMapLib.GeoUtils.getDistance(startPoint, endPoint);
    },
    generateAddressDesc(address) {
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
}