/**
 * @module views\crm\basic
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";

@Component
export default class Basic extends Vue {
  [x: string]: any;
  onSelectedMenu(index, path) {
    console.log(index, path);
    if (!index) {
      return;
    }
    this.$router.push({
      path: index
    });
  }
  mounted() {

  }
}
