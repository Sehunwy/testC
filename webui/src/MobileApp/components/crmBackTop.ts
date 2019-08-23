/**
 * @module MobileApp\components
 */
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";

@Component
export default class CrmBackTop extends Vue {
  [x: string]: any;
  @Prop({ default: 40 }) right!: Number;
  @Prop({ default: 70 }) bottom!: Number;
  @Prop({ default: 300 }) distance!: Number;
  @Prop({ default: "" }) containerId!: string;
  @Prop({ default: null }) targetElement!: any;

  private container: any = null;
  private showBackTop = false;
  private totalScrollTime = 300; // 单位：毫秒
  private step = 0;
  private stepScrollTime = 10; // 单位：毫秒
  private currentTimer: any = null;

  mounted() {
    this.$nextTick(function() {
      this.container = document.getElementById(this.containerId);
    });
  }

  @Watch("container")
  onContainerChange(newVal, oldVal) {
    this.addScrollEventListener();
  }

  private addScrollEventListener() {
    if (!this.container) {
      return;
    }
    this.container.addEventListener("scroll", this.onScrollChange);
  }

  activated() {
    this.onScrollChange();
  }

  private onScrollChange() {
    if (!this.container) {
      return;
    }
    let scrollTop = this.container.scrollTop;
    this.showBackTop = scrollTop >= this.distance;
  }

  private backTop() {
    if (this.targetElement) {
      this.targetElement.scrollIntoView();
      return;
    }
    this.container.scrollTop = 0;
    // this.step = Math.ceil(
    //   this.container.scrollTop / (this.totalScrollTime / this.stepScrollTime)
    // );
    // this.startScroll();
  }

  private startScroll() {
    this.container.scrollTop -= this.step;
    if (this.container.scrollTop <= 0) {
      return;
    }
    this.currentTimer = setInterval(() => {
      this.container.scrollTop -= this.step;
      if (this.container.scrollTop <= 0) {
        clearInterval(this.currentTimer);
      }
    }, this.stepScrollTime);
  }

  destroyed() {
    if (!this.container) {
      return;
    }
    this.container.removeEventListener("scroll", this.onScrollChange);
  }
}
