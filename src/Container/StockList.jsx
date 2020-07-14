import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import ws from "./socket";
import Test from "./StockItem";
import Button from "react-bootstrap/Button";
import { w3cwebsocket as W3CWebSocket } from "websocket";

class stockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "BINANCE:LTCBTC"],
      id: "0",
      prices: {},
      whichStock: "",
      prePrice: {},
      value: "",
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
  handleClose = () => {
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
    this.setState({ value: "" })
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

  handleDuplicatedStock = () => {

    var inputField = document.getElementsByClassName("add")[0];
    this.setState({ value: "" });
    inputField.placeholder = "You have already enter this task"
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }
  handleSubmit = (event) => {
    var inputField = document.getElementsByClassName("add")[0];
    event.preventDefault();
    this.state.data.includes(this.state.value) !== true
      ? this.handleAdd(this.state.value)
      : this.handleDuplicatedStock()


    // fetch(
    //   "https://us-central1-clear-tooling-281208.cloudfunctions.net/first-function/users",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ id: this.state.id, todo: this.state.value }),
    //   }
    // ).then((res) => {
    //   var inputField = document.getElementsByClassName("add")[0];
    //   res.status !== 400
    //     ? this.handleDup()
    //     : (inputField.placeholder = "You have already enter this task");
    //   inputField.value = "";
    // });
  }
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.value}
            onChange={this.handleChange}
            type="text"
            className="add"
          />
          <div className="buttons">
            <Button type="submit" className="b btn btn-success">
              <i className="fa fa-plus"></i>
            </Button>

          </div>
          <Button onClick={this.handleClose}>Close Socket</Button>
        </form>

        <Container className="newCss py-5 bg-faded">
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
