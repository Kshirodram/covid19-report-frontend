import * as actions from "./report.actions";

export const initialState = {
  result: [],
  isLoading: false,
  error: null,
};

const countriesReducer = (state, action) => {
  switch (action.type) {
    case actions.GET_COUNTRIES:
      return { ...state, isLoading: true };
    case actions.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        result: action.payload,
        error: null,
      };
    case actions.GET_COUNTRIES_ERROR:
      return { ...state, isLoading: false, result: [], error: action.payload };

    default:
      return { ...state };
  }
};

const reportReducer = (state, action) => {
  switch (action.type) {
    case actions.GET_REPORT:
      return { ...state, isLoading: true };
    case actions.GET_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        result: action.payload,
        error: null,
      };
    case actions.GET_REPORT_ERROR:
      return { ...state, isLoading: false, result: [], error: action.payload };

    default:
      return { ...state };
  }
};

export { countriesReducer, reportReducer };
