import axios from "axios";
import { store } from "../app/store";
import { setCredentials } from "../features/auth/authSlice";
import { logout } from "../features/auth/authThunks"; // Import from thunks

/**
 * Axios instance
 */
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // 🔥 required for refresh token cookie
});

/**
 * 🔹 REQUEST INTERCEPTOR
 * Runs BEFORE every API call
 * Adds access token to headers
 */
api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 🔹 RESPONSE INTERCEPTOR
 * Runs AFTER every API response
 * Handles expired access token (401)
 */
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // 🔁 Call refresh token API
        const res = await axios.get(
          "http://localhost:5000/api/auth/refresh",
          { withCredentials: true }
        );

        // ✅ Update Redux with new access token
        store.dispatch(
          setCredentials({
            accessToken: res.data.accessToken,
            user: res.data.user,
          })
        );

        // 🔁 Retry original request with new token
        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        // ❌ Refresh token invalid → logout
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
