<template>
  <div class="crmLable">
    <div class="cellTitle van-hairline--bottom">
      <span>{{title}}</span>
      <div class="cellContent">
        <slot>
          <span>{{!content?'-':content}}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.crmLable {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  color: #a4a4a4;
  overflow: hidden;
  padding: 0px 6px;
  line-height: 26px;
  padding-left: 14px;
}
.cellTitle {
  flex: 1;
  font-size: 12px;
  padding-bottom: 8px;
}
.cellContent {
  font-size: 14px;
  line-height: 18px;
  color: #1c1c1c;
}
</style>

<script>
import CrmLabel from "./crmLabel.ts";
export default CrmLabel;
</script>