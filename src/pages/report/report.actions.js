import { default as config } from "../../config/constants.json";

const env = process.env.NODE_ENV || "development";
const appConfig = config[env];

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS";
export const GET_COUNTRIES_ERROR = "GET_COUNTRIES_ERROR";

export const GET_CONFIRMED = "GET_CONFIRMED";
export const GET_CONFIRMED_SUCCESS = "GET_CONFIRMED_SUCCESS";
export const GET_CONFIRMED_ERROR = "GET_CONFIRMED_ERROR";

export const GET_RECOVERED = "GET_RECOVERED";
export const GET_RECOVERED_SUCCESS = "GET_RECOVERED_SUCCESS";
export const GET_RECOVERED_ERROR = "GET_RECOVERED_ERROR";

export const GET_DEATHS = "GET_DEATHS";
export const GET_DEATHS_SUCCESS = "GET_DEATHS_SUCCESS";
export const GET_DEATHS_ERROR = "GET_DEATHS_ERROR";

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

export const getConfirmedAction = () => ({
  type: GET_CONFIRMED,
});

export const getConfirmedSuccessAction = (payload) => ({
  type: GET_CONFIRMED_SUCCESS,
  payload,
});

export const getConfirmedErrorAction = (payload) => ({
  type: GET_CONFIRMED_ERROR,
  payload,
});

export const getRecoveredAction = () => ({
  type: GET_RECOVERED,
});

export const getRecoveredSuccessAction = (payload) => ({
  type: GET_RECOVERED_SUCCESS,
  payload,
});

export const getRecoveredErrorAction = (payload) => ({
  type: GET_RECOVERED_ERROR,
  payload,
});

export const getDeathsAction = () => ({
  type: GET_DEATHS,
});

export const getDeathsSuccessAction = (payload) => ({
  type: GET_DEATHS_SUCCESS,
  payload,
});

export const getDeathsErrorAction = (payload) => ({
  type: GET_DEATHS_ERROR,
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

export const fetchConfirmed = async (dispatch, payload) => {
  const queryStr = new URLSearchParams(payload).toString();
  dispatch(getConfirmedAction());
  try {
    const response = await fetch(
      `${appConfig.API_URL}/api/confirmed/?${queryStr}`
    );
    if (response.ok) {
      // if HTTP-status is 200-299
      const data = await response.json();
      dispatch(getConfirmedSuccessAction(data));
    } else {
      throw new Error({
        status: response.status,
        message: "Error during api call.",
      });
    }
  } catch (e) {
    dispatch(getConfirmedErrorAction(e));
  }
};

export const fetchRecovered = async (dispatch, payload) => {
  const queryStr = new URLSearchParams(payload).toString();
  dispatch(getRecoveredAction());
  try {
    const response = await fetch(
      `${appConfig.API_URL}/api/recovered/?${queryStr}`
    );
    if (response.ok) {
      // if HTTP-status is 200-299
      const data = await response.json();
      dispatch(getRecoveredSuccessAction(data));
    } else {
      throw new Error({
        status: response.status,
        message: "Error during api call.",
      });
    }
  } catch (e) {
    dispatch(getRecoveredErrorAction(e));
  }
};

export const fetchDeaths = async (dispatch, payload) => {
  const queryStr = new URLSearchParams(payload).toString();
  dispatch(getDeathsAction());
  try {
    const response = await fetch(
      `${appConfig.API_URL}/api/deaths/?${queryStr}`
    );
    if (response.ok) {
      // if HTTP-status is 200-299
      const data = await response.json();
      dispatch(getDeathsSuccessAction(data));
    } else {
      throw new Error({
        status: response.status,
        message: "Error during api call.",
      });
    }
  } catch (e) {
    dispatch(getDeathsErrorAction(e));
  }
};
