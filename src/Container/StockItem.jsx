import React, { Component } from "react";
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import client from "./socket";
import Logo from "../Component/StockImage";
import Name from "../Component/StockName";
class stockItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      id: 0,
      logo: "",
      subName: "",
      website: "",
      prePrice: "",
    };
  }
  handleCompanyProfile = (message) => {
    fetch(
      "https://finnhub.io/api/v1/stock/profile2?symbol=" +
        message +
        "&token=bs17pofrh5r8enj77ptg"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          logo: data.logo,
          subName: data.name,
          website: data.weburl,
        });
      });
  };

  handleOpenMarkeData = () => {
    client.onmessage = (message) => {
      if (message.data[2] !== "t") {
        var data = JSON.parse(message.data).data;
        this.setState({ value: data[0].p });
      }
    };
  };

  handleCloseMarketData = (message) => {
    fetch(
      "https://finnhub.io/api/v1/quote?symbol=" +
        message +
        "&token=bs17pofrh5r8enj77ptg"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => this.setState({ value: data.c, prePrice: data.pc }));
  };

  handleclose = () => {
    client.close();
  };

  //show price depend on market time if open show stream else show current price

  componentDidMount() {
    client.onopen = () => {
      client.send(
        JSON.stringify({ type: "subscribe", symbol: this.props.value })
      );
    };
    const convertTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    const nycTime = new Date(convertTime).getHours();
    const nycMin = new Date(convertTime).getMinutes();
    if (nycTime >= 9 && nycMin > 30 && nycTime < 16) {
      this.handleCompanyProfile(this.props.value);
      this.handleOpenMarkeData();
    } else {
      this.handleCloseMarketData(this.props.value);
      this.handleCompanyProfile(this.props.value);
    }
    this.setState({ id: this.props.id });
  }
  handleColor() {
    var sign =
      (this.state.value - this.state.prePrice).toFixed(2) <= 0 ? "- " : "+ ";
    console.log(sign);
    var math =
      sign + Math.abs(this.state.value - this.state.prePrice).toFixed(2);
    var text = "";
    if (sign !== "- ") {
      text = "text-danger";
    } else {
      text = "text-success";
    }
    return (
      <React.Fragment>
        <Card.Text className={text}>{math}</Card.Text>
      </React.Fragment>
    );
  }
  render() {
    const stockName = this.props.value;

    return (
      <React.Fragment>
        <div className="column">
          <Card>
            <div className="imgCard">
              <Logo
                key={stockName}
                website={this.state.website}
                logo={this.state.logo}
              />
            </div>
            <Card.Body>
              <Name symbol={stockName} fullName={this.state.subName} />
              <div className="text1">
                <Card.Text>${this.state.value}</Card.Text>
              </div>
              <div className="text2">
                {/* {((this.state.value - this.state.prePrice).toFixed(2) <= 0
                    ? "- "
                    : "+ ") +
                    Math.abs(this.state.value - this.state.prePrice).toFixed(2)} */}
                {this.handleColor()}
              </div>

              {/* <Button onClick={this.handleclose}>
                Another Link {this.state.id}
              </Button> */}
            </Card.Body>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default stockItem;
