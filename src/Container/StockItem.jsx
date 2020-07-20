import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Logo from "../Component/StockImage";
import Name from "../Component/StockName";
import Button from "react-bootstrap/Button";
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyProfile: {
        logo: "",
        subName: "",
        website: "",
      },
    };
  }


  componentDidMount() {
    this.handleCompanyProfile(this.props.name);
  }

  //get information about the company 
  handleCompanyProfile = (message) => {
    fetch(
      "https://finnhub.io/api/v1/stock/profile2?symbol=" +
      message +
      "&token=bs17pofrh5r8enj77ptg"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(message.split(":"));
        this.setState({
          companyProfile: {
            logo: data.logo,
            subName: data.name,
            website: data.weburl,
          }
        });
      })
  };

  //handle the color of current price - open price = round to two decimal  
  handleColor() {
    var sign =
      (this.props.value - this.props.openPrice).toFixed(2) <= 0 ? "- " : "+ ";
    var math =
      sign + Math.abs(this.props.value - this.props.openPrice).toFixed(2);
    var text = "";
    if (sign === "- ") {
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
    var stockName = this.props.name;
    let price = this.props.value;
    return (
      <React.Fragment>

        <div className="column">
          <Card>
            <div className="imgCard">
              <Logo
                key={stockName}
                website={this.state.companyProfile.website}
                logo={this.state.companyProfile.logo}
              />
            </div>
            <Card.Body>
              <Card.Title>
                <Name
                  symbol={stockName}
                  fullName={this.state.companyProfile.subName}
                />
              </Card.Title>
              <Card.Text>
                <strong>${price}</strong>
              </Card.Text>
              {this.handleColor()}

            </Card.Body>

            <Button
              className="btn-danger"
              onClick={() => this.props.onDelete(this.props.name)}
            >
              Unsubscribe
            </Button>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default Test;
