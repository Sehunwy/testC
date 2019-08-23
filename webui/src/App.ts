import { Component, Watch } from "vue-property-decorator";
import Vue from "vue";
import MainMenu from "./utils/menu";
import { IndexObject } from "./types/index";
import "./utils";
import "./plugins";
import "../public/styles/index.less";
@Component
export default class App extends Vue {
  [x: string]: any;
  private mainMenu = MainMenu as IndexObject;
  private activeIndex = "0";
  private transitionName = "slide-left";

  @Watch("$route")
  private onNavigation(to, from) {
    // if (to.meta.index > from.meta.index) {
    //   this.transitionName = "slide-left";
    // } else {
    //   this.transitionName = "slide-right";
    // }
    // console.log(this.transitionName);
  }

  onselect(key, keypath) {
    let seq = parseInt(key, 0);
    let menu = this.mainMenu.items[seq];
    // console.log( menu );
    this.$router.push({
      path: menu.url
    });
  }
  mounted() {
    
  }
}
