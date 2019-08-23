/**
 * @module MobileApp\welcome
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../appCookies";

@Component
export default class Welcome extends Vue {
  [x: string]: any;

  private totalSkipTime = 3;
  created() {
    this.skipTimer();
  }

  private skipTimer() {
    if (this.totalSkipTime > 0) {
      this.totalSkipTime--;
      setTimeout(this.skipTimer, 1000);
    } else {
      this.skipPage();
    }
  }

  private skipPage() {
    if (this.$route.name !== "welcome") {
      return;
    }
    if (AppCookies.instance.checkCookies()) {
      this.$router.replace("/main/visit");
    } else {
      this.$router.replace("/signin");
    }
  }
}
