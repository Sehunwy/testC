export interface IStatistics {
  count: IStatisticsItem;
  min: IStatisticsItem;
  max: IStatisticsItem;
  idmin: IStatisticsItem;
  idmax: IStatisticsItem;
  sum: IStatisticsItem;
  mean: IStatisticsItem;
  median: IStatisticsItem;
  var: IStatisticsItem;
  std: IStatisticsItem;
  mad: IStatisticsItem;
  skew: IStatisticsItem;
  kurt: IStatisticsItem;
}

export interface IStatisticsItem {
  text: string;
  value: number;
}

export function createStatistics() {
  let res: IStatistics = {
    count: { text: "个数", value: 0 },
    min: { text: "最小值", value: 0 },
    max: { text: "最大值", value: 0 },
    idmax: { text: "最大值项", value: 0 },
    idmin: { text: "最小值项", value: 0 },
    sum: { text: "总和", value: 0 },
    mean: { text: "平均值", value: 0 },
    median: { text: "中位数", value: 0 },
    var: { text: "方差", value: 0 },
    std: { text: "标准差", value: 0 },
    mad: { text: "平均绝对离差", value: 0 },
    skew: { text: "偏度", value: 0 },
    kurt: { text: "峰度", value: 0 }
  };
  return res;
}

export function translate(data: {}): IStatistics {
  let res = createStatistics();
  if (data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        res[key].value = element;
      }
    }
  }
  return res;
}
