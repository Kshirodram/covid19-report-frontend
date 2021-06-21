import React from "react";

import Styles from "./button.module.css";

const Button = (props) => <button className={Styles.button} {...props}>Apply Filter</button>;

export default Button;
