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
      // data: ["BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "BINANCE:LTCBTC"],
      data: ["AMD", "AAPL", "DAL"],
      id: "0",
      prices: {},
      prePrice: "",
      value: "",
      closeOrOpen: "",
      openPrice: "",
    };
  }


  // Dealing with socket 
  componentDidMount() {
    this.connect();
    // this.ws(this.state.data);
  }

  //Connect: when the socket is open subscribe to all this symbol in data
  //and listen for prices changes
  connect = () => {
    const convertTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    const nycTime = new Date(convertTime).getHours();
    const nycMin = new Date(convertTime).getMinutes();
    if (nycTime >= 9 && nycMin > 30 && nycTime < 16) {
      this.handleOpenMarket();
      this.setState({ closeOrOpen: true })
    } else {
      console.log("something")
      this.handleCloseMarket();
      this.setState({ closeOrOpen: false })
    }
  };

  handleOpenMarket = () => {
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
          prices: { ...prevState.prices, [data[0].s]: data[0].p },
        }));
      }
    };
  }

  handleCloseMarket = () => {
    // console.log(this.state.data)
    this.state.data.map((item) => {
      fetch(
        "https://finnhub.io/api/v1/quote?symbol=" +
        item +
        "&token=bs17pofrh5r8enj77ptg"
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        }).then((data) => {
          if (typeof data.error !== "undefined") {
            this.handleErrorStock();
          }
          else {
            this.setState((prevState) => ({
              prices: { ...prevState.prices, [item]: data.c, [item + "open"]: data.o },
            }))
          }


        })

      // .then((data) => this.setState({ value: data.c, prePrice: data.pc }));

    })
  };
  //close connection
  handleClose = () => {
    ws.close();
  };

  //unsub item
  handleDelete = (message) => {
    // console.log(message);
    ws.send(JSON.stringify({ type: "unsubscribe", symbol: message }));
    this.setState((prevState) => ({
      data: [...prevState.data.filter((element) => element !== message)],
    }));
  };

  //add item
  handleAdd = (message) => {
    if (this.state.closeOrOpen) {
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
    }
    else {
      this.setState({
        data: [...this.state.data, message],
      }, () => { this.handleCloseMarket() })
    }

  };



  // For searching 


  //handle duplicating stock
  handleDuplicatedStock = () => {
    var inputField = document.getElementsByClassName("add")[0];
    this.setState({ value: "" });
    inputField.placeholder = "You have already enter this task"
  }
  // handle unavailable stock
  handleErrorStock = () => {
    var inputField = document.getElementsByClassName("add")[0];
    this.setState({ value: "" });
    inputField.placeholder = "Stock is not Avaliable"
  }

  // handle changes in the input form
  handleChange = (event) => {
    this.setState({ value: event.target.value });

  }
  // handle when submit check whether the stock is already made
  handleSubmit = (event) => {
    event.preventDefault();
    this.state.data.includes(this.state.value) !== true
      ? this.handleAdd(this.state.value)
      : this.handleDuplicatedStock()
  }


  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Add Stock"
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
          {/* <Button onClick={this.handleClose}>Close Socket</Button> */}
        </form>

        <Container className="newCss py-5 bg-faded">
          <div className="row">
            {this.state.data.map((item, index) => (
              <Test
                key={index}
                name={item}
                onDelete={this.handleDelete}
                value={this.state.prices[item]}
                openPrice={this.state.prices[item + "open"]}
                openOrnot={this.state.closeOrOpen}
              />
            ))}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default stockList;
