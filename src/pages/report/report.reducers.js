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

const confirmedReducer = (state, action) => {
  switch (action.type) {
    case actions.GET_CONFIRMED:
      return { ...state, isLoading: true };
    case actions.GET_CONFIRMED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        result: action.payload,
        error: null,
      };
    case actions.GET_CONFIRMED_ERROR:
      return { ...state, isLoading: false, result: [], error: action.payload };

    default:
      return { ...state };
  }
};

const recoveredReducer = (state, action) => {
  switch (action.type) {
    case actions.GET_RECOVERED:
      return { ...state, isLoading: true };
    case actions.GET_RECOVERED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        result: action.payload,
        error: null,
      };
    case actions.GET_RECOVERED_ERROR:
      return { ...state, isLoading: false, result: [], error: action.payload };

    default:
      return { ...state };
  }
};

const deathsReducer = (state, action) => {
  switch (action.type) {
    case actions.GET_DEATHS:
      return { ...state, isLoading: true };
    case actions.GET_DEATHS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        result: action.payload,
        error: null,
      };
    case actions.GET_DEATHS_ERROR:
      return { ...state, isLoading: false, result: [], error: action.payload };

    default:
      return { ...state };
  }
};

export {
  countriesReducer,
  confirmedReducer,
  recoveredReducer,
  deathsReducer,
};
