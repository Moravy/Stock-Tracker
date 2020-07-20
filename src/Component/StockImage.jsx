import React from "react";
import Card from "react-bootstrap/Card";

const Logo = (message) => {
  try {
    //check if logo not exist and website exist
    if (message.logo.length === 0 && message.website.length !== 0) {

      var joined =
        "https://logo.clearbit.com/" + message.website.split("www.")[1];
      return (
        <a href={message.website}><Card.Img
          bsPrefix="card-img"
          variant="top"
          src={joined}
          className="mx-auto"
        /></a>
      );
      // check if both exist
    } else if (message.logo.length !== 0 && message.website.length !== 0) {
      return (
        <a href={message.website}><Card.Img
          bsPrefix="card-img"
          variant="top"
          src={message.logo}
          className="mx-auto"
        /></a>
      );
    }
    else {
      return <Card.Img
        alt="cannot find image"
      />;
    }
  }
  catch (error) {
    return (
      <Card.Img
        alt="STOCK is not Avaliable"
      />
    )
  }


};

export default Logo;
