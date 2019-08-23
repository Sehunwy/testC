/**
 * @module views\main
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import siderBar from "@/components/layout/siderBar";
import navBar from "@/components/layout/navBar";
import basicInformation from "@/views/basicData/enterpriseBasicInformation/basicInformation";

@Component({
  components: { siderBar, navBar, basicInformation }
})
export default class Main extends Vue {
  private isCollapse = false;
  private mainWidth = 0;
  private siderWidth = 181;
  private year = (new Date()).getFullYear();
  mounted() {  
    this.mainWidth = document.documentElement!.clientWidth - this.siderWidth;
  }

  private onChange() {
    if (this.isCollapse) {
      this.isCollapse = false;
      this.siderWidth = 181;
      this.mainWidth = document.documentElement!.clientWidth - this.siderWidth;
      return;
    } else {
      this.isCollapse = true;
      this.siderWidth = 64;
      this.mainWidth = document.documentElement!.clientWidth - this.siderWidth;
      return;
    }
  }
}
