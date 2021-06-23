import React from "react";
import { Line } from "react-chartjs-2";

import Loader from "../../loader";

import Styles from "./chart.module.css";

const MultiLineChart = ({ dataSource, headingText, loading }) => {
  let sanitizedData1 = (dataSource && dataSource[0] && dataSource[0].data) || [];
  let sanitizedData2 = (dataSource && dataSource[1] && dataSource[1].data) || [];
  const data = {
    labels: sanitizedData1.map((item) => item.date),
    datasets: [
      {
        label: "reported",
        data: sanitizedData1.map((item) => item.casesPerDay),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y1",
      },
      {
        label: "recovered",
        data: sanitizedData2.map((item) => item.casesPerDay),
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        yAxisID: "y2",
      },
    ],
  };

  const options = {
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          color: "rgb(255, 99, 132)",
          beginAtZero: true,
        },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "rgb(54, 162, 235)",
          beginAtZero: true,
          min: 0,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: true,
    },
  };
  return (
    <div className={Styles.chartWrapper}>
      <h2>{headingText}</h2>
      <section
        className={`${Styles.chartContent} ${
          loading ? Styles.chartLoading : ""
        }`}
      >
        {data ? <Line data={data} options={options} /> : <h2>No data found</h2>}
        {loading && <Loader className={Styles.chartLoader} />}
      </section>
    </div>
  );
};

export default MultiLineChart;
