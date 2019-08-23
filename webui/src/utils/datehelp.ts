/**
 * the date & datetime helper
 * added  by changhl
 * 2018-10-24
 */

// import { DatePickerOptions } from "element-ui";
import { DatePickerOptions } from "element-ui/types/date-picker";
import { IndexObject } from "../types/index";

export class DateRangeHelper {
  public static get CurrenDay(): Date[] {
    let start = new Date();
    let end = new Date();
    return [start, end];
  }

  public static RecentDays(day: number): Date[] {
    let start = new Date();
    let end = new Date();
    start.setDate(start.getDate() - day + 1);
    return [start, end];
  }

  public static get Weekly(): Date[] {
    let start = new Date();
    let end = new Date();
    let day = start.getDay();
    start.setDate(start.getDate() - day);
    end.setDate(end.getDate() + 6 - day);
    return [start, end];
  }

  public static PreviousWeek(week: number): Date[] {
    let start = new Date();
    let end = new Date();
    let day = start.getDay();
    start.setDate(start.getDate() - day - 7 * week);
    end.setDate(end.getDate() + 6 - day - 7 * week);
    return [start, end];
  }

  public static get Monthly(): Date[] {
    let start = new Date();
    let end = new Date();
    start.setDate(1);
    end.setMonth(end.getMonth() + 1);
    end.setDate(1);
    end.setDate(end.getDate() - 1);
    return [start, end];
  }

  public static get PreviousMonth(): Date[] {
    let start = new Date();
    let end = new Date();
    start.setMonth(start.getMonth() - 1, 1);
    end.setDate(1);
    end.setDate(end.getDate() - 1);
    return [start, end];
  }

  public static RecentMonth(month: number): Date[] {
    let start = new Date();
    let end = new Date();
    end.setMonth(end.getMonth() + 1, 0);

    start.setMonth(start.getMonth() - month + 1, 1);
    return [start, end];
  }

  public static get CurrentYear(): Date[] {
    let start = new Date();
    let end = new Date();
    start.setMonth(0, 1);
    end.setFullYear(end.getFullYear() + 1, 0, 1);
    end.setDate(end.getDate() - 1);
    return [start, end];
  }

  public static get ElmentUIPickOption(): DatePickerOptions {
    return {
      shortcuts: [
        {
          text: "当天",
          onClick: (picker: IndexObject) => {
            picker.$emit("pick", DateRangeHelper.CurrenDay);
          }
        },
        {
          text: "最近三天",
          onClick: (picker: IndexObject) => {
            picker.$emit("pick", DateRangeHelper.RecentDays(3));
          }
        },
        {
          text: "本周",
          onClick: (picker: IndexObject) => {
            picker.$emit("pick", DateRangeHelper.Weekly);
          }
        },
        {
          text: "上周",
          onClick: (picker: IndexObject) => {
            picker.$emit("pick", DateRangeHelper.PreviousWeek(1));
          }
        },
        {
          text: "本月",
          onClick: (picker: IndexObject) => {
            picker.$emit("pick", DateRangeHelper.Monthly);
          }
        },
        {
          text: "上个月",
          onClick: (picker: IndexObject) => {
            picker.$emit("pick", DateRangeHelper.PreviousMonth);
          }
        },
        {
          text: "最近三个月",
          onClick: (picker: IndexObject) => {
            picker.$emit("pick", DateRangeHelper.RecentMonth(3));
          }
        },
        {
          text: "本年",
          onClick: (picker: IndexObject) => {
            picker.$emit("pick", DateRangeHelper.CurrentYear);
          }
        }
      ]
    };
  }
}
