import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "./store";

const initialState = {
  theme: JSON.parse(window?.localStorage.getItem("theme")) ?? "light",
};

export const setTheme = (value) => {
  return (dispatch) => {
    dispatch(themeSlice.actions.setTheme(value));
  };
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

export const {} = themeSlice.actions;

export default themeSlice.reducer;
