/**
 * @module MobileApp\main\item
 */
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../../appCookies";
import common from "@/MobileApp/utils/common";
import crmBackTop from "@/MobileApp/components/crmBackTop";
import crmList from "@/MobileApp/components/crmList";
import itemTemplate from "./itemTemplate";

@Component({
  components: { crmBackTop, crmList,itemTemplate }
})
export default class Item extends Vue {
  [x: string]: any;
  private activeTab = 0;
  private tabContentHeight = 0;
  private isLeader;

  private keywordSelf = "";
  private keywordSubordinate = "";
  private keywordInvolve = "";

  created() {
    this.isLeader = JSON.parse(AppCookies.instance.getIsLeader());
  }

  mounted() {
    this.tabContentHeight = document.documentElement!.clientHeight - 90 - 50;
    this.onActiveTabChange(this.activeTab);
  }

  private onActiveTabChange(index) {
    if (this.isLeader) {
      if (index === 0) {
        this.initSubDataList();
        console.log("当前是下属事项");
      }
      if (index === 1) {
        this.initSelfDataList();
        console.log("当前是我的事项");
      }
      if (index === 2) {
        this.initInvolveDataList();
        console.log("当前是参与事项");
      }
    } else {
      if (index === 0) {
        this.initSelfDataList();
        console.log("当前是我的事项");
      }
      if (index === 1) {
        this.initInvolveDataList();
        console.log("当前是参与事项");
      }
    }
  }

  private initSubDataList(){
    this.$nextTick(function() {
      (this.$refs.subordinateCrmList as IndexObject).initDataList();
    });
  }

  private initSelfDataList(){
    this.$nextTick(function() {
      (this.$refs.selfCrmList as IndexObject).initDataList();
    });
  }

  private initInvolveDataList(){
    this.$nextTick(function() {
      (this.$refs.involveCrmList as IndexObject).initDataList();
    });
  }

  get refreshSubItemIndicator() {
    return this.$store.state.refreshSubItemIndicator;
  }

  @Watch("refreshSubItemIndicator")
  onRefreshSubItemIndicatorChanged(newVal, oldVal) {
    console.log("开始刷新下属事项数据");
    this.loadSubordinateItemDatas();
  }

  private loadSubordinateItemDatas() {
    (this.$refs.subordinateCrmList as IndexObject).loadDataList();
  }

  get refreshSelfItemIndicator() {
    return this.$store.state.refreshSelfItemIndicator;
  }

  @Watch("refreshSelfItemIndicator")
  onRefreshSelfItemIndicatorChanged(newVal, oldVal) {
    console.log("开始刷新我的事项数据");
    this.loadSelfItemDatas();
  }

  private loadSelfItemDatas() {
    (this.$refs.selfCrmList as IndexObject).loadDataList();
  }

  private loadInvolveItemDatas() {
    (this.$refs.involveCrmList as IndexObject).loadDataList();
  }

  private goCreateItem() {
    this.$router.push("/createItem");
  }

  private goItemDetails(itemId) {
    if (!itemId) {
      return;
    }
    this.$router.push({ path: "/itemDetails", query: { id: itemId } });
  }
}
