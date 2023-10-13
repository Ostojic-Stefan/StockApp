import { InitMessage, Structure } from "./types";
import { makeStructure, mapToArray } from "./util";

class WebSocketApi {
  private chanPairMap = new Map<number, string>();
  private pairDataMap = new Map<string, Structure>();
  private sock: WebSocket | null = null;

  constructor(private url: string) {}

  connect() {
    return new Promise((resolve, reject) => {
      this.sock = new WebSocket(this.url);
      this.sock.onopen = () => {
        resolve(null);
      };
      this.sock.onerror = (error) => {
        reject(error);
      };
    });
  }

  send(data: InitMessage) {
    if (this.sock && this.sock.readyState === WebSocket.OPEN) {
      this.sock.send(JSON.stringify(data));
    } else {
      return Promise.reject(new Error("WebSocket connection is not open"));
    }
  }

  receiveInit() {
    if (!this.sock)
      return Promise.reject(new Error("WebSocket connection is not open"));

    this.sock?.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);

      if (data.event && data.event === "subscribed") {
        this.chanPairMap.set(data.chanId, data.pair);
      }
    });
  }

  receiveData(callback: (data: Structure[]) => void) {
    if (!this.sock)
      return Promise.reject(new Error("WebSocket connection is not open"));

    this.sock.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);

      if (Array.isArray(data) && Array.isArray(data[1])) {
        const pair = this.chanPairMap.get(data[0]);
        if (!pair) return console.log("error");
        this.pairDataMap.set(pair, makeStructure(pair, data[1]));
        callback(mapToArray(this.pairDataMap));
      }
    });
  }

  close() {
    this.sock?.close();
  }
}

export default new WebSocketApi("wss://api-pub.bitfinex.com/ws/2");
