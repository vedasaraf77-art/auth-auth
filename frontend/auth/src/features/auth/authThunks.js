// import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/axios";
// import { setCredentials } from "./authSlice";

// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       //   const res = await api.post("/login", {
//       //     email,
//       //     password,
//       //   });

//       const res = {
//         data: {
//           accessToken: "fake-token-123",
//           user: { email },
//         },
//       };

//       const { accessToken, user } = res.data;

//       thunkAPI.dispatch(setCredentials({ accessToken, user }));

//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { setCredentials, clearAuth } from "./authSlice";

/* LOGIN THUNK */
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      const { accessToken, user } = res.data;
      thunkAPI.dispatch(setCredentials({ accessToken, user }));

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* LOGOUT THUNK */
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.post("/api/auth/logout", {}, { withCredentials: true });
    thunkAPI.dispatch(clearAuth()); // Add this to clear the state
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/auth/refresh");
      const { accessToken, user } = res.data;

      thunkAPI.dispatch(setCredentials({ accessToken, user }));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);
