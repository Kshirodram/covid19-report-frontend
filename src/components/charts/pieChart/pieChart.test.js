import React from "react";
import PieChart from "../pieChart";
import sampleData from "./mockdata.json";
// setup file
import { configure } from "enzyme";
import { shallow, mount, render } from "enzyme";

describe("PieChartComponent", () => {
  it("should render successfully", () => {
    const currentContext = React.createRef().current;
    const filterCountryCase = (data) => {
      let highestConfirmed = [];
      data.forEach((item) => {
        let reqData = {
          country: item.countryCode || "",
          hconfirmed: item.data[item.data.length - 1].confirmed,
        };
        if (
          reqData.hconfirmed !== "undefined" &&
          typeof reqData.country !== "undefined"
        ) {
          highestConfirmed.push(reqData);
        }
      });
      return highestConfirmed;
    };

    const filterTopFive = (data) => {
      return data
        .sort((a, b) => (a.hconfirmed > b.hconfirmed ? 1 : -1))
        .slice(0, 5);
    };
    const highestCountry = filterTopFive(filterCountryCase(sampleData.data));

    const data = {
      labels: highestCountry.map((item) => item.country),
      // labels: ["Country1", "Country2", "Country3", "Country4", "Country5"]
      datasets: [
        {
          label: "# of votes",
          data: highestCountry.map((item) => item.hconfirmed),
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
    const wrapped = shallow(<PieChart data={data} />, {
      disableLifecycleMethods: true,
    });

    expect(wrapped).toBeTruthy();
  });
});
