import Styles from "./Card.module.css";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Button from "./Button";


function Card({ imagen,text,onClick }) {
    const [show, setShown] = useState(false);
  
    const props3 = useSpring({
      transform: show ? "scale(1.03)" : "scale(1)",
      boxShadow: show
        ? "0 20px 25px rgb(0 0 0 / 25%)"
        : "0 2px 10px rgb(0 0 0 / 8%)",
    });
  

    return React.createElement(
      "animated.div",
      {
        className: Styles.card,
        style: props3,
        onMouseEnter: () => setShown(true),
        onMouseLeave: () => setShown(false),
      },
      React.createElement("img", { src: imagen, alt: "" }),
      React.createElement("h2", null, text),
      React.createElement(
        "p",{ className: Styles.p },"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."),
      React.createElement(
        "div",
        { className: Styles.btnn },
        React.createElement(Button, { text: "See Inventory" ,onClick: () => onClick(text)}),
      )
    );
  }
  
  export default Card;
  