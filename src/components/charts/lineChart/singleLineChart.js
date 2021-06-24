import React from "react";
import { Line } from "react-chartjs-2";

import Loader from "../../loader";

import Styles from "./chart.module.css";

const SingleLineChart = ({ dataSource, headingText, loading }) => {
  const data = {
    labels: dataSource.map((item) => item.date),
    datasets: [
      {
        label: "deaths",
        data: dataSource.map((item) => item.casesPerDay),
        fill: false,
        backgroundColor: "#b4b4b4",
        yAxisID: "y",
      },
    ],
  };

  const options = {
    scales: {
      y: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
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

export default SingleLineChart;
