import React, { useState, useCallback } from "react";
import DatePicker from "react-datepicker";

import Dropdown from "../dropdown";
import Button from "../button";

import Styles from "./filterPanel.module.css";

const FilterPanel = ({ onSubmit, loading, data, ...rest }) => {
  const [filterValues, setFilterValues] = useState({
    startDate: null,
    endDate: null,
    country: null,
    state: null,
  });

  const [states, setStates] = useState([]);

  const filterStatesBasedOnCountry = (data, selectedCountry) => {
    const selectedCountryArr = data.filter((country) => {
      return country.name === selectedCountry;
    });
    if (selectedCountryArr.length === 1) {
      return selectedCountryArr[0].states || [];
    }
  };

  const handleDatePickerClick = useCallback(
    (dateObj) => {
      setFilterValues({ ...filterValues, ...dateObj });
    },
    [setFilterValues, filterValues]
  );

  const handleOnChange = useCallback(
    (selectedObj) => {
      setFilterValues({ ...filterValues, ...selectedObj });
      const key = Object.keys(selectedObj)[0];
      if (key === "country") {
        const filteredStates = filterStatesBasedOnCountry(
          data,
          selectedObj[key]
        );
        setStates(filteredStates);
      }
    },
    [setFilterValues, filterValues, data]
  );

  return (
    <section className={Styles.filter}>
      <DatePicker
        selected={filterValues.startDate}
        onChange={(date) => handleDatePickerClick({ startDate: date })}
        selectsStart
        startDate={filterValues.startDate}
        endDate={filterValues.endDate}
        placeholderText={"From"}
        className={Styles.date}
        dateFormat={"dd/MM/yyyy"}
      />
      <DatePicker
        selected={filterValues.endDate}
        onChange={(date) => handleDatePickerClick({ endDate: date })}
        selectsEnd
        startDate={filterValues.startDate}
        endDate={filterValues.endDate}
        minDate={filterValues.startDate}
        placeholderText={"To"}
        className={Styles.date}
        dateFormat={"dd/MM/yyyy"}
      />
      <Dropdown
        className={Styles.filterDropdown}
        getSelectedValue={(value) => handleOnChange({ country: value })}
        loading={loading}
        dataSource={data}
      />
      <Dropdown
        className={Styles.filterDropdown}
        getSelectedValue={(value) => handleOnChange({ state: value })}
        loading={loading}
        dataSource={states}
      />
      <Button onClick={() => onSubmit(filterValues)} />
    </section>
  );
};

export default FilterPanel;
