import React, { Component } from "react";
import { Header } from "./Component/Header";
import TestStock from "./Container/StockList";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Header />
        <TestStock />
        {/* <Stock /> */}
      </React.Fragment>
    );
  }
}

export default App;
