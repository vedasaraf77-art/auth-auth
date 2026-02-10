import jwt from "jsonwebtoken";
import { users } from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import { cookieOptions } from "../utils/cookieOptions.js";

export const login = (req, res) => {
  const { email, password } = req.body;

  // fake validation for now
  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  // fake tokens
  const accessToken = "access-token-123";
  const refreshToken = "refresh-token-abc";

  // 🔐 SET REFRESH TOKEN IN COOKIE
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: false, // true in production (https)
  });

  res.json({
    accessToken,
    user: { email },
  });
};


export const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  // for now (fake validation)
  const newAccessToken = "new-access-token-456";

  res.json({
    accessToken: newAccessToken,
    user: { email: "test@gmail.com" },
  });
};


export const logout = (req, res) => {
  res.clearCookie("refreshToken", cookieOptions);
  res.json({ message: "Logged out" });
};
