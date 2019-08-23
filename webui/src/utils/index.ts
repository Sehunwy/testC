import Vue from "vue";
import WebApi from "./api";
import MqClient from "./mq";
import { DatePickerOptions } from "iview";
import { get } from "./api";
import { IndexObject } from "../types/index";
export * from "./api";

Vue.prototype.$Api = new WebApi();

let dt = Date.prototype as IndexObject;

// Vue.prototype.$Mq = new MqClient();

export let dateRangeOption: DatePickerOptions = {
  shortcuts: [
    {
      text: "当天",
      value: () => {
        let start = new Date();
        let end = new Date();
        return [start, end];
      }
    },
    {
      text: "最近三天",
      value: () => {
        let start = new Date();
        let end = new Date();
        start.setDate(start.getDate() - 2);
        return [start, end];
      }
    },
    {
      text: "本周",
      value: () => {
        let start = new Date();
        let end = new Date();
        let day = start.getDay();
        start.setDate(start.getDate() - day);
        end.setDate(end.getDate() + 6 - day);
        return [start, end];
      }
    },
    {
      text: "本月",
      value: () => {
        let start = new Date();
        let end = new Date();
        start.setDate(1);
        end.setMonth(end.getMonth() + 1);
        end.setDate(1);
        end.setDate(end.getDate() - 1);
        return [start, end];
      }
    },
    {
      text: "上月",
      value: () => {
        let start = new Date();
        let end = new Date();
        start.setMonth(start.getMonth() - 1, 1);
        end.setDate(1);
        end.setDate(end.getDate() - 1);
        return [start, end];
      }
    },
    {
      text: "最近三个月",
      value: () => {
        let start = new Date();
        let end = new Date();
        end.setMonth(end.getMonth() + 1, 0);

        start.setMonth(start.getMonth() - 2, 1);
        return [start, end];
      }
    },
    {
      text: "本年度",
      value: () => {
        let start = new Date();
        let end = new Date();
        start.setMonth(0, 1);
        end.setFullYear(end.getFullYear() + 1, 0, 1);
        end.setDate(end.getDate() - 1);
        return [start, end];
      }
    }
  ],
  disabledDate: () => false
} as DatePickerOptions;

export let ComparisonOperator = {
  gt: "＞",
  ge: "≥",
  eq: "＝",
  lt: "＜",
  le: "≤",
  ne: "≠",
  match: "匹配"
};

export function prefixInteger(num: number, length: number) {
  return (Array(length).join("0") + num).substr(-length);
}
