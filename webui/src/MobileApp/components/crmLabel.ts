/**
 * @module MobileApp\components
 */
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";

@Component
export default class CrmLabel extends Vue {
  @Prop({ default: "" }) title!: string;
  @Prop({ default: "" }) content!: string;
}
