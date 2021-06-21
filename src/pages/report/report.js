import React, { useCallback, useReducer, useEffect } from "react";

import LineChart from "../../components/charts/lineChart";
import FilterPanel from "../../components/filterPanel";
import PieChart from "../../components/charts/pieChart";

import { fetchCountries, fetchReport } from "./report.actions";
import {
  initialState,
  countriesReducer,
  reportReducer,
} from "./report.reducers";

import { formatDate } from "../../utils/formatData";

import Styles from "./report.module.css";

const ReportPage = () => {
  const [countriesState, countryDispatch] = useReducer(
    countriesReducer,
    initialState
  );
  const [reportData, reportDispatch] = useReducer(reportReducer, initialState);

  useEffect(() => {
    fetchCountries(countryDispatch);
    fetchReport(reportDispatch);
  }, [countryDispatch]);

  const applyFilter = useCallback((filterValues) => {
    let newFilterValues = {};
    if (filterValues) {
      if (filterValues.country) {
        newFilterValues = { ...newFilterValues, country: filterValues.country };
      }
      if (filterValues.country && filterValues.state) {
        newFilterValues = { ...newFilterValues, state: filterValues.state };
      }
      if (filterValues.startDate && filterValues.endDate) {
        newFilterValues = {
          ...newFilterValues,
          startDate: formatDate(filterValues.startDate),
          endDate: formatDate(filterValues.endDate),
        };
      }
    }
    fetchReport(reportDispatch, newFilterValues);
  }, []);

  // TODO: to format the data on client side
  // check formatdata util. running out of time ^x^
  const simulateData =
    reportData && reportData.result && reportData.result.length > [0]
      ? reportData.result[0]
      : [];
  return (
    <div className={Styles.reportPage}>
      <header className={Styles.header}>
        <h1>Covid19 data visulization</h1>
        <p>* By default all the reports are showing last 30 days data.</p>
      </header>
      <main>
        <FilterPanel
          onSubmit={(filterValues) => applyFilter(filterValues)}
          loading={countriesState.isLoading}
          data={countriesState.result}
        />
        <LineChart
          multiLine={
            true
          } /* This is redundant we dont need it. If data is formated based on number of source we can decide 
          if its a single line or multiline chart */
          dataSource={simulateData}
          headingText={"Reported and recovered cases"}
          loading={reportData.isLoading}
        />
        <LineChart
          dataSource={simulateData}
          headingText={"Death cases"}
          loading={reportData.isLoading}
        />
        <PieChart
          dataSource={reportData.result}
          headingText={"Reported cases"}
          loading={reportData.isLoading}
        />
      </main>
    </div>
  );
};

export default ReportPage;
