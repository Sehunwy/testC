/**
 * @module views\permission\adminRolePermission
 */
import Vue from "vue";
import { Component,Watch } from "vue-property-decorator";

@Component
export default class AdminRolePermission extends Vue {
  private container = document.getElementsByClassName('el-icon-caret-right');
  private roles = ["计划员", "超级管理员", "系统管理员"];
  private data5 = [];
  private data = [
    {
      id: 1,
      label: "生产现场",
      addresMenu: "/basicData/enterpriseBasicInformation/basicInformation",
      icon: "icon-icon28",
      functionItem:"xxx",
      children: [
        {
          id: 2,
          label: "称重配料",
          addresMenu: "/permission/adminAccount/",
          icon: "icon-icon28",
          functionItem:"xxx",
          children: [
            {
              id: 3,
              label: "发料生产",
              addresMenu: "/permission/adminAccount/",
              icon: "icon-icon28",
              functionItem:"xxx",
            },
            {
              id: 4,
              label: "现场控制台",
              addresMenu: "/permission/adminAccount/",
              icon: "icon-icon28",
              functionItem:"xxx",
            },
            {
              id: 5,
              label: "现场车间综合管理",
              addresMenu: "/permission/adminAccount/",
              icon: "icon-icon28",
              functionItem:"xxx",
            }
          ]
        }
      ]
    },
    {
      id: 11,
      label: "生产计划",
      addresMenu: "/permission/adminAccount/",
      icon: "icon-icon28",
      functionItem:"xxx",
      children: [
        {
          id: 12,
          label: "生产计划查询",
          addresMenu: "/permission/adminAccount/",
          icon: "icon-icon28",
          functionItem:"xxx",
        }
      ]
    }
  ];

  mounted() {
    this.data5 = JSON.parse(JSON.stringify(this.data));     
  }
}
