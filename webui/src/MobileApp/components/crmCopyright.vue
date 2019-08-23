<template>
  <div class="copyrightContainer">
    <div class="copyright">© {{currentYear}} 光华致创</div>
  </div>
</template>

<style scoped>
.copyrightContainer {
  position: fixed;
  bottom: 60px;
  left: calc(50% - 48px);
  width: 96px;
}
.copyright {
  text-align: center;
  font-size: 12px;
  color: #a4a4a4;
}
</style>

<script>
import CrmCopyright from "./crmCopyright.ts";
export default CrmCopyright;
</script>