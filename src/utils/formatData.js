import _ from "lodash";

/**
 * Returns formatted data for charts
 *
 * @param {array} data Raw API response to be formatted.
 * @return {array} formattedData
 */
// TODO: revisit this again. skipping this for demo purpose
const formatData = (data, filterType = "country") => {
  const groupedData = _.groupBy(data, "countryCode");
  const countriesCode = Object.keys(groupedData);
  countriesCode.forEach((cc) => {
    if (cc) {
      groupedData[cc].forEach((item) => {
        // const confirmedTotal = _.sumBy(item.data, obj => _.sumBy(obj.Specific, 'Value'))
      });
    }
  });
  return data;
};

/**
 * Returns formatted date in "YYYY-MM-DD"
 *
 * @param {date}  Date() string.
 * @return {date} to returns formatted date
 */
const formatDate = (date) => date.toISOString().split("T")[0];

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
