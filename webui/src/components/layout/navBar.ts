/**
 * @module components\layout\navBar
 */
import Vue from "vue";
import { Component,Watch } from "vue-property-decorator";
import { RouteRecord } from 'vue-router';
import pathToRegexp from 'path-to-regexp';

@Component
export default class NavBar extends Vue {
    private breadcrumbs: RouteRecord[] = [];

    @Watch('$route')
    private onRouteChange() {
      this.getBreadcrumb();
    }

    created() {
        this.getBreadcrumb();
    }    

    private getBreadcrumb() {
        let matched = this.$route.matched.filter((item) => item.name);
        this.breadcrumbs = matched.filter((item) => {
          return item.meta && item.meta.title && item.meta.breadcrumb !== false;
        });
      }

      private pathCompile(path: string) {
        const { params } = this.$route;
        const toPath = pathToRegexp.compile(path);
        return toPath(params);
      }

      private handleLink(item: any) {
        const { redirect, path } = item;
        if (redirect) {
          this.$router.push(redirect);
          return;
        }
        this.$router.push(this.pathCompile(path));
      }
}
