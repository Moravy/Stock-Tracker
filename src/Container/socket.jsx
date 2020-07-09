import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket(
  "wss://ws.finnhub.io?token=bs17pofrh5r8enj77ptg"
);

export default client;
