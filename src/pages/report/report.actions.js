import { default as config } from "../../config/constants.json";

const env = process.env.NODE_ENV || "development";
const appConfig = config[env];

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS";
export const GET_COUNTRIES_ERROR = "GET_COUNTRIES_ERROR";

export const GET_REPORT = "GET_REPORT";
export const GET_REPORT_SUCCESS = "GET_REPORT_SUCCESS";
export const GET_REPORT_ERROR = "GET_REPORT_ERROR";

export const GET_TOP5_DATA = "GET_TOP5_DATA";
export const GET_TOP5_DATA_SUCCESS = "GET_TOP5_DATA_SUCCESS";
export const GET_TOP5_DATA_ERROR = "GET_TOP5_DATA_ERROR";

export const getCountriesAction = () => ({
  type: GET_COUNTRIES,
});

export const getCountriesSuccessAction = (payload) => ({
  type: GET_COUNTRIES_SUCCESS,
  payload,
});

export const getCountriesErrorAction = (payload) => ({
  type: GET_COUNTRIES_ERROR,
  payload,
});

export const getReportAction = () => ({
  type: GET_REPORT,
});

export const getReportSuccessAction = (payload) => ({
  type: GET_REPORT_SUCCESS,
  payload,
});

export const getReportErrorAction = (payload) => ({
  type: GET_REPORT_ERROR,
  payload,
});

// TODO: to move this to worker or utils,
// also make a wrapper for fetch for better error handling on API calls
export const fetchCountries = async (dispatch) => {
  dispatch(getCountriesAction());
  try {
    const response = await fetch(`${appConfig.API_URL}/api/countries`);
    if (response.ok) {
      // if HTTP-status is 200-299
      const data = await response.json();
      dispatch(getCountriesSuccessAction(data));
    } else {
      throw new Error({
        status: response.status,
        message: "Error during api call.",
      });
    }
  } catch (e) {
    dispatch(getCountriesErrorAction(e));
  }
};

// TODO: to move this to worker or utils,
// also make a wrapper for fetch for better error handling on API calls
export const fetchReport = async (dispatch, payload) => {
  const queryStr = new URLSearchParams(payload).toString();
  dispatch(getReportAction());
  try {
    const response = await fetch(`${appConfig.API_URL}/api/report/?${queryStr}`);
    if (response.ok) {
      // if HTTP-status is 200-299
      const data = await response.json();
      dispatch(getReportSuccessAction(data));
    } else {
      throw new Error({
        status: response.status,
        message: "Error during api call.",
      });
    }
  } catch (e) {
    dispatch(getReportErrorAction(e));
  }
};
