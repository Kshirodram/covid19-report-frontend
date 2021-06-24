import React, { useCallback, useReducer, useEffect } from "react";

import LineChart from "../../components/charts/lineChart";
import FilterPanel from "../../components/filterPanel";
import PieChart from "../../components/charts/pieChart";

import {
  fetchCountries,
  fetchConfirmed,
  fetchRecovered,
  fetchDeaths,
} from "./report.actions";
import {
  initialState,
  countriesReducer,
  confirmedReducer,
  recoveredReducer,
  deathsReducer,
} from "./report.reducers";

import { formatDate, formatData } from "../../utils/formatData";

import Styles from "./report.module.css";

const ReportPage = () => {
  const [countriesState, countryDispatch] = useReducer(
    countriesReducer,
    initialState
  );

  const [confirmedData, confirmedDispatch] = useReducer(
    confirmedReducer,
    initialState
  );
  const [recoveredData, recoveredDispatch] = useReducer(
    recoveredReducer,
    initialState
  );
  const [deathsData, deathsDispatch] = useReducer(deathsReducer, initialState);

  useEffect(() => {
    fetchCountries(countryDispatch);
    (async () => {
      await Promise.all([
        fetchConfirmed(confirmedDispatch),
        fetchRecovered(recoveredDispatch),
      ]);
    })();
    fetchDeaths(deathsDispatch);
  }, [countryDispatch, confirmedDispatch, recoveredDispatch, deathsDispatch]);

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
    (async () => {
      await Promise.all([
        fetchConfirmed(confirmedDispatch, newFilterValues),
        fetchRecovered(recoveredDispatch, newFilterValues),
      ]);
    })();

    fetchDeaths(deathsDispatch, newFilterValues);
  }, []);

  const formattedConfirmedData = formatData(confirmedData.result, "confirmed");
  const formattedRecoveredData = formatData(recoveredData.result, "recovered");
  const formattedDeathsdData = formatData(deathsData.result, "deaths");

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
          dataSource={[formattedConfirmedData, formattedRecoveredData]}
          headingText={"Reported and recovered cases"}
          loading={confirmedData.isLoading && recoveredData.isLoading}
        />
        <LineChart
          dataSource={formattedDeathsdData}
          headingText={"Death cases"}
          loading={deathsData.isLoading}
        />
        <PieChart
          dataSource={confirmedData.result}
          headingText={"Reported cases"}
          loading={confirmedData.isLoading}
        />
      </main>
    </div>
  );
};

export default ReportPage;
