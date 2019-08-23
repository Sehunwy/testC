/**
 * @module MobileApp\main\item
 */
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import format from "@/plugins/format";

@Component({
  filters: {
    formatDateTime(date) {
      return format.formatDateTime(date, "yyyy-MM-dd");
    },
    formatItemLevel(level) {
      return format.formatItemLevel(level);
    },
    formatItemState(state) {
      return format.formatItemState(state);
    },
    formatItemStateColor(state) {
      return format.formatItemStateColor(state);
    }
  }
})
export default class ItemTemplate extends Vue {
  [x: string]: any;
  @Prop({ default: null }) itemData!: object;
}
