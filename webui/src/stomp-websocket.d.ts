declare module "stomp-websocket" {
  interface Client {
    maxWebSocketFrameSize: number;
    over(ws: WebSocket): void;
    begin(): void;
    subscribe(destination: string, callback: Function, headers: object): any;
    send(destination: string, headers: object, body: string): void;
    commit(): void;
    abort(): void;
    debug(info: string): void;
    connect(
      user: string,
      pwd: string,
      onConnect: Function,
      onError: Function
    ): void;
  }
  function over(ws: WebSocket): Client;
}
