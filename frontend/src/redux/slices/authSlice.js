import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   token: null,
// };

// try {
//   const storedUser = localStorage.getItem("user");
//   const storedToken = localStorage.getItem("token");

//   if (storedUser) {
//     initialState.user = JSON.parse(storedUser);
//   }
//   if (storedToken) {
//     initialState.token = storedToken;
//   }
// } catch (error) {
//   console.error("Error loading auth data from localStorage:", error);
//   localStorage.removeItem("user");
//   localStorage.removeItem("token");
// }

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       localStorage.setItem("user", JSON.stringify(action.payload.user));
//       localStorage.setItem("token", action.payload.token);
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;

// export default authSlice.reducer;
