import { RequestInfo, Res } from "@/utils/api";

/**
 * 分页接口定义
 */
export interface PageOptions {
  Total?: number;

  PageSize?: number;

  CurrentPage?: number;
}

export interface IServiceData {
  [key: string]: any;
  req: RequestInfo;
  res: Res;
  pageOption: PageOptions;
  isBusy?: boolean;
}

export interface IndexObject {
  [x: string]: any;
}
