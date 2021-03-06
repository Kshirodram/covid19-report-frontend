import _ from "lodash";

/**
 * Returns merged data with sum of keys for two arrays
 *
 * @param {array} arr1 Array to be merged
 * @param {array} arr2 Array to be merged
 * @param {string} key Key type whether confirmed/recovered/deaths
 * @return {array} formattedData
 */
// TODO: revisit this again. skipping this for demo purpose
const mergeArrays = (arr1, arr2, type) => {
  return Object.values(
    arr1.concat(arr2).reduce((acc, v) => {
      if (!acc[v.date]) {
        acc[v.date] = { date: v.date, casesPerDay: 0, [type]: 0 };
      }
      acc[v.date][type] += v[type];
      acc[v.date].casesPerDay += v.casesPerDay;
      return acc;
    }, {})
  );
};

/**
 * Returns formatted data for charts
 *
 * @param {array} data Raw API response to be formatted.
 * @return {array} formattedData
 */
// TODO: revisit this again. skipping this for demo purpose
const formatData = (rawData, type = "confirmed", filterType = "") => {
  if (rawData && rawData.length > 1) {
    let newData = [...rawData[0].data];
    for (let i = 1; i < rawData.length; i++) {
      const mergedData = mergeArrays(newData, rawData[i].data, type);
      newData = [...mergedData];
    }
    return newData;
  } else if (rawData && rawData.length === 1) {
    return rawData[0].data;
  } else {
    return [];
  }
};

/**
 * Returns formatted date in "YYYY-MM-DD"
 *
 * @param {date}  Date() string.
 * @return {date} to returns formatted date
 */
const formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
};

/**
 * Returns latest date data as it will
 * show all the acuumulated number
 *
 * @param {array}  data Raw API response to be formatted.
 * @return {date} total confirmed cases per country
 */
const getTotalConfirmedCasesByCountry = (data) => {
  let totalConfirmedCases = [];
  if (data && data instanceof Array && data.length > 0) {
    data.forEach((item) => {
      let reqData = {
        country: item.countryCode,
        hconfirmed: item.data[item.data.length - 1].confirmed,
      };
      if (
        reqData.hconfirmed !== "undefined" &&
        typeof reqData.country !== "undefined"
      ) {
        totalConfirmedCases.push(reqData);
      }
    });
  }
  return totalConfirmedCases;
};

/**
 * Returns top five countries by total confirmed cases
 *
 * @param {array}  return type from @getTotalConfirmedCasesByCountry.
 * @return {array} top five countries data by confirmed cases
 */
const filterTopFive = (data) => {
  return data
    .sort((a, b) => (a.hconfirmed > b.hconfirmed ? 1 : -1))
    .slice(Math.max(data.length - 5, 1));
};

export {
  formatDate,
  formatData,
  filterTopFive,
  getTotalConfirmedCasesByCountry,
};
