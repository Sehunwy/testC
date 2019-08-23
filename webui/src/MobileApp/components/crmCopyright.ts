/**
 * @module MobileApp\components\crmCopyright
 */
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import format from "@/plugins/format";
@Component
export default class CrmCopyright extends Vue {
  private currentYear = "";

  created() {
    this.getCurrentYear();
  }

  private getCurrentYear() {
    let date = new Date();
    this.currentYear = format.formatDateTime(date, "yyyy");
  }
}
