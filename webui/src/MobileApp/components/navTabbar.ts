/**
 * @module MobileApp\components
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";

@Component
export default class NavTabbar extends Vue {
  [x: string]: any;
  private active = 1;

  private onChange(a) {
    console.log(a);
  }
}
