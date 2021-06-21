import React from "react";
import { Pie } from "react-chartjs-2";

import Loader from "../../loader";

import {
  getTotalConfirmedCasesByCountry,
  filterTopFive,
} from "../../../utils/formatData";

import Styles from "./chart.module.css";

const PieChart = ({ dataSource, headingText, loading }) => {

  const topFiveCountriesData = filterTopFive(
    getTotalConfirmedCasesByCountry(dataSource)
  );
  
  const data = {
    labels: topFiveCountriesData.map((item) => item.country),
    datasets: [
      {
        label: "# of votes",
        data: topFiveCountriesData.map((item) => item.hconfirmed),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      labels: {
        fontSize: 25,
      },
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
        {data ? (
          <Pie data={data} options={options} height={400} width={600} />
        ) : (
          <h2>No data found</h2>
        )}
        {loading && <Loader className={Styles.chartLoader} />}
      </section>
    </div>
  );
};

export default PieChart;
