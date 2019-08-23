/**
 * @module components\layout\siderBar
 */
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class SiderBar extends Vue {
  private active = "/basicData/enterpriseBasicInformation/basicInformation";
  private sales = true;
  private customer = false;

  @Prop({ default: false }) isCollapse!: boolean;
  @Prop({ default: "181" }) siderWidth!: string;

  mounted() {
    this.active = this.$route.path;
  }

  @Watch('$route')
  private onRouteChange() {
    this.active = this.$route.path;
  }

}
