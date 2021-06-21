import React from "react";

import Styles from "./loader.module.css";

const Loader = ({ className }) => (
  <div className={`${Styles.loader} ${className}`} />
);

export default Loader;
