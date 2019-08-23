/**
 * 模块声明
 */
import WebApi from "./utils/api";
import MqClient from "./utils/mq";
// import * as iview from "iview/types";

declare module "vue/types/vue" {
  interface Vue {
    $Api: WebApi;
    $Mq: MqClient;
  }
}

declare module "*.html" {
  const content: string;
  export default content;
}

// declare module "iview" {
//   export default iview.default;
//   export * from "iview/types";
// }
