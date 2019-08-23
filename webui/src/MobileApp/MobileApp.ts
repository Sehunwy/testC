/**
 * @module MobileApp
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppCookies from "./appCookies";

@Component
export default class MobileApp extends Vue {
  created() {
    console.log(this.$route.path);
    console.log("光华CRM");
    if (!AppCookies.instance.checkCookies()) {
      this.$router.replace("/");
    }
  }
}
