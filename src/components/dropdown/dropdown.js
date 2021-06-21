import React, { useState, useCallback, useRef, useEffect } from "react";

import { default as useOutsideClick } from "../common/useOutSideClick";

import Loader from "../loader";

import { ReactComponent as DownArrowIcon } from "../../assets/images/downArrow.svg";
import { ReactComponent as CrossIcon } from "../../assets/images/crossIcon.svg";

import Styles from "./dropdown.module.css";

const INITIAL_STATE = { name: "", value: "" };

const Dropdown = ({
  dataSource,
  className,
  getSelectedValue,
  loading = false,
}) => {
  const [data, setData] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(INITIAL_STATE);

  const inputElement = useRef(null);
  const inputWrapperElement = useRef(null);

  useEffect(() => {
    setData(dataSource || []);
    setSelectedOption(INITIAL_STATE);
  }, [dataSource, setSelectedOption]);

  const toggleOptions = useCallback(() => {
    setShowOptions(!showOptions);
    inputElement.current.focus();
  }, [showOptions]);

  const selectOption = useCallback(
    (option) => {
      setSelectedOption(option);
      getSelectedValue(option.value);
      toggleOptions();
    },
    [toggleOptions, getSelectedValue]
  );

  const removeValue = useCallback(() => {
    setSelectedOption(INITIAL_STATE);
    getSelectedValue("");
    setData(dataSource);
  }, [getSelectedValue, dataSource]);

  const searchValue = useCallback(
    (e) => {
      const searchText = (e && e.target && e.target.value.trim()) || "";
      const wildcardText = searchText.toLowerCase();
      const filteredData = dataSource.filter((item, index) => {
        return item.name.toLowerCase().includes(wildcardText);
      });
      if (data.length > 0 || wildcardText) {
        setData([...filteredData]);
      } else {
        setData([...dataSource]);
      }
      if (data.length > 0 && wildcardText) {
        setShowOptions(true);
      }
      setSelectedOption({ value: "", name: searchText });
    },
    [data, dataSource]
  );

  useOutsideClick(inputWrapperElement, () => {
    setShowOptions(false);
  });
  return (
    <div
      className={`${Styles.drodownWrapper} ${className}`}
      ref={inputWrapperElement}
    >
      <div className={Styles.inputBox}>
        <input
          type="text"
          className={Styles.input}
          placeholder="Select..."
          onClick={toggleOptions}
          ref={inputElement}
          value={selectedOption.name}
          onChange={searchValue}
        />
        <p className={Styles.inputBoxIcons}>
          {loading ? (
            <Loader className={Styles.dropDownLoader} />
          ) : (
            <CrossIcon className={Styles.icon} onClick={removeValue} />
          )}
          <span className={Styles.divider} />
          <DownArrowIcon className={Styles.icon} onClick={toggleOptions} />
        </p>
      </div>
      {showOptions ? (
        <ul className={Styles.optionsWrapper}>
          {data.map((item, i) => (
            <li key={`key-${item.value}`} onClick={() => selectOption(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
