import React from 'react';
import Styles from "./Button.module.css";

function Button({ text }) {
  return <h2 className={Styles.btn}>{text}</h2>;
}

export default Button;
