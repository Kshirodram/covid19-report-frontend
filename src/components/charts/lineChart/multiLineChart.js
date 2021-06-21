import React from "react";
import { Line } from "react-chartjs-2";

import Loader from "../../loader";

import Styles from "./chart.module.css";

const MultiLineChart = ({ dataSource, headingText, loading }) => {
  let sanitizedData = (dataSource && dataSource.data) || [];
  const data = {
    labels: sanitizedData.map((item) => item.date),
    datasets: [
      {
        label: "reported",
        data: sanitizedData.map((item) => item.confirmedPerDay),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y1",
      },
      {
        label: "recovered",
        data: sanitizedData.map((item) => item.recoveredPerDay),
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
