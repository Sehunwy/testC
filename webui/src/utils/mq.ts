/**
 * added by changhl,2018-10-15
 * stomp-websocket:与rabbitmq进行通信
 * 
 */

import { WS_MQ_URL } from "./conf";
import stomp, { Client } from "stomp-websocket";

const ws = new WebSocket(WS_MQ_URL.url);
const client = stomp.over(ws);
client.maxWebSocketFrameSize = 6 * 1024 * 1024;
function onConnect() {
  console.log("已与MQ服务进行连接！");
}

function onError(error: any) {
  console.log("出现错误信息：", error.headers.message);
}
client.connect(WS_MQ_URL.user, WS_MQ_URL.pwd, onConnect, onError);

/**
 * 订阅消息的句柄
 */
interface Subscription {
  id: string;
  unsubscribe(): void;
}

class MqClient   {
  private ws: WebSocket;
  private client: Client;
  constructor() {
    this.ws = ws;
    this.client = client;
  }
  /**
   * 发送消息
   * @param destination 消息地址('/exchange/broad_cast' | '/queue/queue')
   * @param onMessage 收到消息后回调函数
   * @param headers 消息头
   */
  public subscribe(destination: string, onMessage: (info: string)=>void, headers = {}): Promise<Subscription> {
    
    let promise = new Promise<Subscription>((resolve, reject) => {
      let execute = () => {
        let subscription = this.client.subscribe(
          destination,
          onMessage,
          headers
        );
        resolve(subscription);
      };
      if (this.ws.readyState === 1) {
        execute();
      } else if (this.ws.readyState === 0) {
        this.ws.addEventListener("open", () => execute());
      } else {
        reject();
      }
    });
    return promise;
  }

  public send(destination: string, header = {}, body: string) {
    this.connect().then(() => {
      this.client.send(destination, header, body);
    });
  }

  public begin() {
    this.connect().then(() => {
      this.client.begin();
    });
  }

  public commit() {
    this.connect().then(() => {
      this.client.commit();
    });
  }

  public abort() {
    this.connect().then(() => {
      this.client.abort();
    });
  }

  public debug(info: string) {
    this.connect().then(() => this.client.debug(info));
  }

  private connect(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      if (this.ws.readyState === 1) {
        resolve();
      } else if (this.ws.readyState === 0) {
        this.ws.addEventListener("open", () => {
          resolve();
        });
      } else {
        reject();
      }
    });
    return promise;
  }
}
export default MqClient;
