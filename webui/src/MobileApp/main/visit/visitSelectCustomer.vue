<template>
  <div>
    <selectCustomer
      title="选择拜访客户"
      :showComponent="true"
      @goBack="goBack"
      @complete="selectCustomerComplete"
    ></selectCustomer>
  </div>
</template>

<style scoped lang="less"></style>

<script>
import VisitSelectCustomer from "./visitSelectCustomer.ts";
export default VisitSelectCustomer;
</script>