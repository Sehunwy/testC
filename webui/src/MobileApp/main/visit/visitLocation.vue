<template>
  <div>
    <location
      title="拜访定位"
      rightText="开始拜访"
      @goBack="goBack"
      @locationCompleted="locationCompleted"
      @selectionChanged="selectionChanged"
    ></location>
  </div>
</template>

<style scoped lang="less"></style>

<script>
import VisitLocation from "./visitLocation.ts";
export default VisitLocation;
</script>