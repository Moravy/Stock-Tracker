import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import ws from "./socket";
import Test from "./StockItem";
import Button from "react-bootstrap/Button";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// import ws from "./socket";
// let ws = "";
class stockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "BINANCE:LTCBTC"],
      id: "0",
      prices: {},
      whichStock: "",
      prePrice: {},
    };
  }

  componentDidMount() {
    this.connect();
    // this.ws(this.state.data);
  }

  //Connect: when the socket is open subscribe to all this symbol in data
  //and listen for prices changes
  connect = () => {
    ws.onopen = () => {
      this.state.data.map((item) => {
        ws.send(JSON.stringify({ type: "subscribe", symbol: item }));
        this.setState({ prices: { [item]: "" } });
      });
    };
    ws.onmessage = (message) => {
      if (message.data[2] !== "t") {
        var data = JSON.parse(message.data).data;

        this.setState((prevState) => ({
          whichStock: data[0].s,
          prices: { ...prevState.prices, [data[0].s]: data[0].p },
        }));
      }
    };
  };
  //close connection
  handleclose = () => {
    ws.close();
  };
  //unsub item
  handleDelete = (message) => {
    console.log(message);
    ws.send(JSON.stringify({ type: "unsubscribe", symbol: message }));
    this.setState((prevState) => ({
      data: [...prevState.data.filter((element) => element !== message)],
    }));
  };
  //add item
  handleAdd = (message) => {
    this.setState(
      (prevState) => ({
        data: [...prevState.data, message],
      }),
      (ws.onopen = () => {
        this.state.data.map((item) => {
          ws.send(JSON.stringify({ type: "subscribe", symbol: item }));
          this.setState({ prices: { [item]: "" } });
        });
      })
    );
  };
  render() {
    return (
      <React.Fragment>
        <Container className="newCss py-5 bg-faded">
          <Button onClick={this.handleclose}>as</Button>
          <Button onClick={() => this.handleDelete("BINANCE:BTCUSDT")}>
            delete
          </Button>
          <Button onClick={() => this.handleAdd("BINANCE:BNBBTC")}>add</Button>
          <div className="row">
            {this.state.data.map((item, index) => (
              <Test
                key={index}
                name={item}
                onDelete={this.handleDelete}
                value={this.state.prices[item]}
              />
            ))}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default stockList;
