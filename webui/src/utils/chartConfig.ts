import highcharts from "highcharts";

export default class ChartConfig {
  public static Pareto() {
    // let paretoSerie:highcharts.seriesp

    let opt = {
      chart: {
        type: "column"
      },
      title: { text: "帕累托图" },
      subtitle: { text: "" },
      xAxis: {
        categories: []
      },
      yAxis: [
        {
          title: { text: "" },
          minPadding: 0,
          maxPadding: 0,
          max: 100,
          min: 0,
          opposite: true,
          labels: {
            format: "{value}%"
          }
        }
      ],
      series: [
        {
          type: "pareto",
          name: "累计比率",
          yAxis: 1,
          zIndex: 10,
          baseSeries: 1,
          tooltip: {
            pointFormat: "{series.name} {point.y:.2f} %"
          }
        },
        {
          name: "",
          type: "column",
          zIndex: 2,
          data: []
        }
      ]
    };
    return opt;
  }
}
