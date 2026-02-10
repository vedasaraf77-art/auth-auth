import express from "express";
import {
  login,
  refresh,
  logout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.get("/refresh", refresh);   // ✅ FIXED
router.post("/logout", logout);    // ✅ ONLY ONE LOGOUT

export default router;
