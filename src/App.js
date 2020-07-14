import React, { Component } from "react";
import { Header } from "./Component/Header";
import StockBody from "./Container/StockList";
import Test from "./ignoredFolder/test";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Header />
        {/* <Test /> */}
        <StockBody />
      </React.Fragment>
    );
  }
}

export default App;
