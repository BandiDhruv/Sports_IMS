import React from 'react';
import Styles from "./Button.module.css";

function Button({ text ,onClick}) {
  return <h2 className={Styles.btn} onClick={onClick}>{text}</h2>;
}

export default Button;
