import { API_BASE_URL, SERVICE_URL } from "./conf";
import axios from "axios";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

/**
 * 服务请求信息
 */
export interface RequestInfo {
  /**
   * python 模块名称
   */
  moduleName: string;
  /**
   * 调用的方法
   */
  method: string;
  /**
   * 方法要传入的参数
   */
  args: { [key: string]: any };

  /**
   * 调用的类名
   */
  className: string;
}
/**
 * 返回的结果
 */
export interface Data {
  /**
   * 调用后台是否成功
   */
  isSuccess: boolean;
  /**
   * 服务返回的数据
   */
  data: any | any[] | object | string;
  /**
   * 错误信息
   */
  error: string;
}
export interface Res {
  data: Data;
}

/**
 * WebAPI对axios简单封装
 */
export class WebApi {
  public invoke(request: RequestInfo): Promise<Res> {
    return this.post(SERVICE_URL, request);
  }

  public get(url: string, params?: object): Promise<Res> {
    let param = {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
    };
    if (params) {
      param = { ...params, ...param };
    }
    return axios.get(url, { params: param });
  }

  public post(urlstr: string, params?: object) {
    return axios({
      method: "post",
      url: urlstr,
      data: params
    });
  }
}

export default WebApi;

export function invoke(request: RequestInfo): Promise<Res> {
  return axios({
    method: "post",
    url: "api/service",
    data: request
  });
}

export function get(url: string, params?: object) {
  let param = {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
  };
  if (typeof params === "object") {
    param = { ...params, ...param };
  }
  return axios.get(url, { params: param });
}

// export default invoke;
