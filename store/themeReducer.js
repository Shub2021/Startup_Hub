import * as themeActionTypes from "./themeAction";
import { selectedTheme } from "../constants";

const initialState = {
  appTheme: selectedTheme,
  error: null,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case themeActionTypes.THEME_BEGIN:
      return {
        ...state,
        erro: null,
      };
    case themeActionTypes.THEME_DONE:
      return {
        ...state,
        appTheme: action.payload.selectedTheme,
      };
    case themeActionTypes.THEME_FAIL:
      return {
        ...state,
        appTheme: action.payload.error,
      };
    default:
      return state;
  }
};

export default themeReducer;
