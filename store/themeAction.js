import { lightTheme, darkTheme } from "../constants";

export const THEME_BEGIN = "THEME_BEGIN";
export const THEME_DONE = "THEME_DONE";
export const THEME_FAIL = "THEME_FAIL";

export const themeBegin = () => ({
  type: THEME_BEGIN,
});

export const themeDone = () => ({
  type: THEME_DONE,
  payload: { selectedTheme },
});
export const themeFail = (error) => ({
  type: THEME_FAIL,
  payload: { error },
});
export function toggleTheme(themeType) {
  return (dispatch) => {
    dispatch(themeBegin());
    switch (themeType) {
      case "dark":
        dispatch(themeDone(darkTheme));
        break;
      case "ligth":
        dispatch(themeDone(lightTheme));
        break;
      default:
        dispatch(themeFail({ error: "Invalid theme type" }));
        break;
    }
  };
}
