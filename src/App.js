import React, { Component } from "react";
import { Header } from "./Component/Header";
import Stock from "./Container/StockList";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Header />
        <Stock />
      </React.Fragment>
    );
  }
}

export default App;
