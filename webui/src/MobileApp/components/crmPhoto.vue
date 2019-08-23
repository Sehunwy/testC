<template>
  <div>
    <div class="createHeader flexRowLayout van-hairline--bottom" v-show="showHeader">
      <div class="flexRowLayout" style="justify-content: flex-start;">
        <img src="../../assets/img/separate.png">
        <span class="headerText">{{headerTitle}}</span>
      </div>
      <div class="headerCreateBtn" @click="onPickPhoto" v-show="!readOnly">
        <span class="icon iconfont icon-uploadphoto"></span>
      </div>
    </div>
    <div class="nonePhoto" v-show="readOnly&&(!photoIds||photoIds.length===0)">
      <span>没有照片</span>
    </div>
    <div class="photoContainer">
      <div class="photoItemContainer" v-for="(item, index) in photoIds" :key="index">
        <img          
          :preview="businessId"
          :preview-text="customerName"
          :style="{ height: picHeight + 'px' ,width: picWidth + 'px'}"
          :src="thumbUrl+item"
          :large="largeUrl+item"
          @click="onViewPhoto"
        >
        <span
          :style="{ width: picWidth + 'px'}"
          class="deleteContainer"
          @click="confirmDeletePhoto(index)"
          v-show="!readOnly"
        >
          <span class="icon iconfont icon-delete deleteIcon"></span>
        </span>
      </div>
      <div
        :style="{ height: picHeight-2 + 'px' ,width: picWidth-2 + 'px'}"
        class="pickPhotoContainer"
        @click="onPickPhoto"
        v-show="!readOnly"
      >
        <div class="inputContainer">
          <input
            ref="cameraInput"
            id="cameraInput"
            name="cameraInput"
            type="file"
            accept="image/*"
            capture="camera"
            @change="onCameraInputChange"
          >
          <input
            ref="ablumInput"
            id="ablumInput"
            name="ablumInput"
            type="file"
            accept="image/*"
            multiple="multiple"
            @change="onAblumInputChange"
          >
        </div>
        <span class="icon iconfont icon-uploadphoto cameraIcon"></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url(../common.less);

.createHeader {
  background-color: #fff;
  height: 40px;
  & img {
    height: 24px;
    width: 20px;
  }
  .headerText {
    font-size: 11pt;
    font-weight: 600;
  }
  .headerCreateBtn {
    padding: 5px 15px;
    & span {
      color: #3fcc8e;
      font-size: 14pt;
      font-weight: 600;
    }
  }
}

.photoContainer {
  padding: 4px;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.photoItemContainer {
  position: relative;
  display: inline-block;
  margin-left: 2px;
  margin-bottom: 2px;
}

.pickPhotoContainer {
  position: relative;
  border: 1px dashed #3fcc8e;
  border-radius: 8px;
  display: inline-block;
  overflow: hidden;
  line-height: 88px;
  text-align: center;
  margin-left: 2px;
  margin-bottom: 2px;
}

.deleteContainer {
  height: 30px;
  background-color: #fff;
  opacity: 0.8;
  text-align: center;
  line-height: 30px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.deleteIcon {
  color: #3fcc8e;
}

.cameraIcon {
  color: #3fcc8e;
  font-size: 26px;
}

.inputContainer {
  width: 0px;
  height: 0px;
  overflow: hidden;
}

.nonePhoto {
  padding: 5px 0px;
  text-align: center;
  & span {
    color: #757575;
    font-size: 12px;
  }
}
</style>

<script>
import CrmPhoto from "./crmPhoto.ts";
export default CrmPhoto;
</script>