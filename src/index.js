import React from "react";
import ReactDOM from "react-dom";

import "./index.module.css";
import "react-datepicker/dist/react-datepicker.css";

import ReportPage from "./pages/report";

ReactDOM.render(
  <React.StrictMode>
    <ReportPage />
  </React.StrictMode>,
  document.getElementById("root")
);
