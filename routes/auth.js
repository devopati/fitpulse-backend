import express from "express";
import {
  changePassword,
  login,
  register,
  resetPassword,
  sendPasswordResetCode,
  updateUserDetails,
  verifyEmail,
} from "../controllers/auth/index.js";
import verifyToken from "../middlewares/verify-token.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/verify/:code").post(verifyToken, verifyEmail);

router.route("/login").post(login);

router.route("/update").patch(verifyToken, updateUserDetails);

router.route("/change-password").patch(verifyToken, changePassword);

router.route("/reset-password").post(sendPasswordResetCode);

router.route("/reset-password").patch(verifyToken, resetPassword);

export default router;
