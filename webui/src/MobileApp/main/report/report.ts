/**
 * @module MobileApp\main\report
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import Highcharts from "highcharts/highstock";
import HighchartsDrilldown from "highcharts/modules/drilldown";

@Component
export default class Report extends Vue {
  [x: string]: any;
  private activeNames = "-1";
  updated() {
    this.$nextTick(function() {
      this.initHighcharts();
    });
  }

  private initHighcharts() {
    switch (this.activeNames) {
      case "1":
        this.salesVisitReport();
        break;
      case "2":
        this.customerVisitAnalysisReport();
        break;
      case "3":
        this.addCustomerAnalysisReport();
        break;
      case "4":
        this.customerTotalAnalysisReport();
        break;
      case "5":
        this.salesVisitsRankingListReport();
        break;
      case "6":
        this.newCustomerRankingListReport();
        break;
      case "7":
        this.workExecutionAnalysisReport();
        break;
      case "8":
        this.workExecutionTrajectoryReport();
        break;
    }
  }

  private salesVisitReport() {
    Highcharts.chart("salesVisit", {
      credits: { enabled: false },
      chart: {
        type: "bar"
      },
      title: {
        text: undefined
      },
      tooltip: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: [
          "四川片区",
          "重庆片区",
          "安徽片区",
          "福建片区",
          "云贵片区",
          "广东片区",
          "西北片区",
          "华东片区"
        ]
      },
      yAxis: {
        visible: false
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            allowOverlap: true
          }
        }
      },
      series: [
        {
          data: [10, 8, 5, 6, 8, 9, 5, 8]
        }
      ]
    });
  }

  private customerVisitAnalysisReport() {
    Highcharts.chart("customerVisitAnalysis", {
      credits: { enabled: false },
      chart: {
        type: "column"
      },
      title: {
        text: undefined
      },
      tooltip: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: [
          "四川片区",
          "重庆片区",
          "安徽片区",
          "福建片区",
          "云贵片区",
          "广东片区",
          "西北片区",
          "华东片区"
        ],
        labels: { x: 10 }
      },
      yAxis: {
        visible: false
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            allowOverlap: true
          }
        }
      },
      series: [
        {
          data: [115, 98, 67, 89, 66, 52, 81, 74]
        }
      ]
    });
  }

  private addCustomerAnalysisReport() {
    Highcharts.chart("addCustomerAnalysis", {
      credits: { enabled: false },
      title: { text: undefined },
      tooltip: { enabled: undefined },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            format: "<b>{point.name}</b>: {point.percentage:.1f} %"
          }
        }
      },
      series: [
        {
          type: "pie",
          name: "新增客户占比",
          data: [
            ["四川片区", 35.0],
            ["重庆片区", 26.8],
            ["安徽片区", 12.8],
            ["福建片区", 10.5],
            ["云贵片区", 6.2],
            ["广东片区", 20.7],
            ["西北片区", 7.7],
            ["华东片区", 19.7]
          ]
        }
      ]
    });
  }

  private customerTotalAnalysisReport() {
    Highcharts.chart("customerTotalAnalysis", {
      credits: { enabled: false },
      title: { text: undefined },
      legend: { enabled: undefined },
      tooltip: {
        enabled: false
      },
      yAxis: {
        visible: false
      },
      xAxis: {
        categories: [
          "2018-07",
          "2018-08",
          "2018-09",
          "2018-10",
          "2018-11",
          "2018-12",
          "2019-01"
        ],
        labels: { x: 10 }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
            allowOverlap: true
          }
        }
      },
      series: [
        {
          data: [5331, 5692, 5776, 5825, 5986, 6542, 6880]
        }
      ]
    });
  }

  private salesVisitsRankingListReport() {
    Highcharts.chart("salesVisitsRankingList", {
      chart: {
        type: "column"
      },
      credits: { enabled: false },
      tooltip: { enabled: false },
      title: {
        text: undefined
      },
      xAxis: {
        type: "category",
        labels: { x: 10 }
      },
      yAxis: {
        visible: false
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: "{point.y}"
          }
        }
      },
      series: [
        {
          data: [
            {
              name: "四川片区",
              y: 149
            },
            {
              name: "重庆片区",
              y: 117
            },
            {
              name: "安徽片区",
              y: 78
            },
            {
              name: "福建片区",
              y: 92
            },
            {
              name: "云贵片区",
              y: 66
            },
            {
              name: "广东片区",
              y: 105
            },
            {
              name: "西北片区",
              y: 76
            },
            {
              name: "华东片区",
              y: 125
            }
          ]
        }
      ]
    });
  }

  private newCustomerRankingListReport() {
    Highcharts.chart("newCustomerRankingList", {
      chart: {
        type: "column"
      },
      credits: { enabled: false },
      tooltip: { enabled: false },
      title: {
        text: undefined
      },
      xAxis: {
        type: "category",
        labels: { x: 10 }
      },
      yAxis: {
        visible: false
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: "{point.y}"
          }
        }
      },
      series: [
        {
          data: [
            {
              name: "四川片区",
              y: 11
            },
            {
              name: "重庆片区",
              y: 8
            },
            {
              name: "安徽片区",
              y: 6
            },
            {
              name: "福建片区",
              y: 7
            },
            {
              name: "云贵片区",
              y: 5
            },
            {
              name: "广东片区",
              y: 8
            },
            {
              name: "西北片区",
              y: 5
            },
            {
              name: "华东片区",
              y: 9
            }
          ]
        }
      ]
    });
  }
  private workExecutionAnalysisReport() {
    // Highcharts.chart("workExecutionAnalysis", {
    //   credits: { enabled: false },
    //   chart: {
    //     type: "area"
    //   },
    //   title: {
    //     text: undefined
    //   },
    //   tooltip: {
    //     enabled: false
    //   },
    //   legend: {
    //     enabled: false
    //   },
    //   xAxis: {
    //     categories: [
    //       "苹果",
    //       "梨",
    //       "橘子",
    //       "香蕉",
    //       "葡萄",
    //       "李子",
    //       "草莓",
    //       "树莓"
    //     ]
    //   },
    //   yAxis: {
    //     visible: false
    //   },
    //   plotOptions: {
    //     area: {
    //       dataLabels: {
    //         enabled: true,
    //         allowOverlap: true
    //       }
    //     }
    //   },
    //   series: [
    //     {
    //       data: [0, 1, 4, 4, 5, 2, 3, 7]
    //     }
    //   ]
    // });
  }

  private workExecutionTrajectoryReport() {
    // Highcharts.chart("workExecutionTrajectory", {
    //   credits: { enabled: false },
    //   chart: {
    //     type: "pie"
    //   },
    //   title: {
    //     text: undefined
    //   },
    //   tooltip: {
    //     enabled: false
    //   },
    //   plotOptions: {
    //     pie: {
    //       allowPointSelect: true,
    //       cursor: "pointer",
    //       dataLabels: {
    //         style: { fontSize: "8px" },
    //         format:
    //           '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
    //           "面积 (平方千米): <b>{point.y}</b><br/>"
    //       }
    //     }
    //   },
    //   series: [
    //     {
    //       innerSize: "20%",
    //       name: "countries",
    //       data: [
    //         {
    //           name: "西班牙",
    //           y: 505370
    //         },
    //         {
    //           name: "法国",
    //           y: 551500
    //         },
    //         {
    //           name: "波兰",
    //           y: 312685
    //         },
    //         {
    //           name: "捷克共和国",
    //           y: 78867
    //         },
    //         {
    //           name: "意大利",
    //           y: 301340
    //         },
    //         {
    //           name: "瑞士",
    //           y: 41277
    //         },
    //         {
    //           name: "德国",
    //           y: 357022
    //         }
    //       ]
    //     }
    //   ]
    // });
  }
  private goBack() {
    this.$router.back();
  }
}
