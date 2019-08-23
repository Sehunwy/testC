<template>
  <div>
    <location
      title="选择客户位置"
      @goBack="goBack"
      @locationCompleted="locationCompleted"
    ></location>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
</style>

<script>
import CustomerLocation from "./customerLocation.ts";
export default CustomerLocation;
</script>