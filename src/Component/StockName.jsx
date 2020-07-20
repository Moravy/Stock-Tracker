import React from "react";
import Card from "react-bootstrap/Card";

const StockName = (message) => {

  return (
    <React.Fragment>
      <Card.Subtitle>
        {message.fullName} <p className="text-muted">({message.symbol})</p>
      </Card.Subtitle>
    </React.Fragment>
  );
};

export default StockName;
