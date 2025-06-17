import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();
router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  userController.createUserController
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  userController.loginController
);

router.get(
  "/profile",
  authMiddleware.authUser,
  userController.profileController
);

router.get("/logout", authMiddleware.authUser, userController.logoutController);

router.get('/all', authMiddleware.authUser, userController.getAllUsersController);

// password-reset functionality
router.post(
  "/reset-password/send-code",
  body("email").isEmail().withMessage("Email must be valid"),
  userController.sendResetCodeController
);

router.post(
  "/reset-password/verify-code",
  body("email").isEmail().withMessage("Email must be valid"),
  body("code").isLength({ min: 6, max: 6 }).withMessage("Code must be 6 digits"),
  userController.verifyResetCodeController
);

router.post(
  "/reset-password",
  body("email").isEmail().withMessage("Email must be valid"),
  body("newPassword")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character (@$!%*?&)"),
  userController.resetPasswordController
);


export default router;
