import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import StockItem from "./StockItem";

class stockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["AMD", "AAPL", "ZOM", "DAL", "LUV", "NKE", "INTC"],
      id: "0",
    };
  }

  render() {
    return (
      <React.Fragment>
        <Container className="newCss py-5 bg-faded">
          <div className="row">
            {this.state.data.map((item, index) => (
              <StockItem key={index} id={index} value={item} />
            ))}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default stockList;
// {
//   /* <Container className="newCss py-5 bg-faded">
//           <CardColumns>
//             {this.state.data.map((item, index) => (
//               <StockItem class="eachCard" key={index} id={index} value={item} />
//             ))}
//           </CardColumns>
//         </Container> */
// }
