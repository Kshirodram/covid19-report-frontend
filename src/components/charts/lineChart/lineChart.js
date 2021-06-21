import React from "react";

import SingleLineChart from "./singleLineChart";
import MultiLineChart from "./multiLineChart";

const LineChart = ({ multiLine = false, ...rest }) => (
  <>
    {multiLine ? <MultiLineChart {...rest} /> : <SingleLineChart {...rest} />}
  </>
);

export default LineChart;
