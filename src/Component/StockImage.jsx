import React from "react";
import Card from "react-bootstrap/Card";

const Logo = (message) => {
  // console.log(message);
  try {


    if (message.logo.length === 0 && message.website.length !== 0) {
      // console.log(message.website.split("www.")[1]);
      var joined =
        "https://logo.clearbit.com/" + message.website.split("www.")[1];
      return (
        <Card.Img
          bsPrefix="card-img"
          variant="top"
          src={joined}
          className="mx-auto"
        />
      );
    } else if (message.logo.length !== 0 && message.website.length !== 0) {
      return (
        <Card.Img
          bsPrefix="card-img"
          variant="top"
          src={message.logo}
          className="mx-auto"
        />
      );
    }
    else {
      return <div></div>;
    }
  }
  catch (error) {
    return (
      <Card.Img
        alt="No image"
      />
    )
  }


};

export default Logo;
