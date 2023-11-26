import Styles from "./Card.module.css";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Button from "./Button";


function Card({ imagen,text,paragraph,onClick }) {
    const [show, setShown] = useState(false);
  
    const props3 = useSpring({
      transform: show ? "scale(1.03)" : "scale(1)",
      boxShadow: show
        ? "0 20px 25px rgb(0 0 0 / 25%)"
        : "0 2px 10px rgb(0 0 0 / 8%)",
    });
  

    return (
      <animated.div className={Styles.card} style={props3} onMouseEnter={() => setShown(true)} onMouseLeave={() => setShown(false)}>
        <img src={imagen} alt="" />
        <h2>{text}</h2>
        <p className={Styles.p}>{paragraph}</p>
        <div className={Styles.btnn}>
          <Button text="See Inventory" onClick={() => onClick(text)} />
        </div>
      </animated.div>
    );
    
  }
  
  export default Card;
  