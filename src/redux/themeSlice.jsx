import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: JSON.parse(window?.localStorage.getItem("theme")) ?? "dark",
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

export const setTheme = (value) => {
  return (dispatch) => {
    dispatch(themeSlice.actions.setTheme(value));
  };
};
