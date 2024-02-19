import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(window?.localStorage.getItem("user")) ?? null,
  edit: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    updateProfile: (state, action) => {
      state.edit = action.payload;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

export const userLogin = (user) => {
  return (dispatch) => {
    dispatch(userSlice.actions.login(user));
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(userSlice.actions.logout());
  };
};

export const updateProfile = (userInfo) => {
  return (dispatch) => {
    dispatch(userSlice.actions.updateProfile(userInfo));
  };
};
