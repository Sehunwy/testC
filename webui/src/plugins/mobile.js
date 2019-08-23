import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import VueCookies from 'vue-cookies-ts'
import Component from 'vue-class-component'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

Vue.use(Vant);
Vue.use(VueCookies);
var photoPreviewOptions = {
  fullscreenEl: false //关闭全屏按钮
};
Vue.use(preview,photoPreviewOptions);

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate' // for vue-router 2.2+
  ]);