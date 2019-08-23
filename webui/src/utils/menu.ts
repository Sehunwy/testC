export interface IMenu {
  name?: string;
  items?: IMenuItem[];
}
export interface IMenuItem {
  name?: string;
  display?: string;
  ico?: string;
  url?: string;
}

export const MainMenu: IMenu = {
  name: "高级排产",
  items: [
    {
      name: "基础数据",
      display: "基础数据",
      ico: "ios-basket",
      url: "/"
    },
    { name: "业务数据", display: "业务数据", ico: "ios-analytics", url: "/business" },
    { name: "统计报表", display: "统计报表", ico: "", url: "/about" },
    { name: "定位服务", display: "定位服务", ico: "", url: "/about" }
    // {
    //   name: "生产订单",
    //   display: "生产订单",
    //   ico: "ios-basket",
    //   url: "/aps/order"
    // },
    // { name: "自动排产", display: "自动排产", ico: "ios-analytics", url: "/" },
    // { name: "生产调度", display: "生产调度", ico: "", url: "/about" },
    // {
    //   name: "原辅料测算",
    //   display: "原辅料测算",
    //   ico: "",
    //   url: "/aps/materialCaculation"
    // },
    // { name: "实时库存", display: "实时库存", ico: "", url: "/aps/storage" },
    // { name: "生产统计", display: "生产统计", ico: "" },
    // { name: "物料", display: "物料", ico: "", url: "/pub/material" },
    // { name: "设备", display: "设备", ico: "", url: "/pub/equipment" },
    // { name: "配方", display: "配方", ico: "", url: "/pub/bom" },
    // { name: "配方追踪", display: "物料正向追踪", ico: "", url: "/pub/track" },
    // { name: "测试", display: "测试", ico: "", url: "/test" },
    // { name: "图片管理", display: "图片管理", ico: "", url: "/image" }
  ]
};

export default MainMenu;
