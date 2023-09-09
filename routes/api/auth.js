const express = require("express");
const { validateBody, authenticate, isValidId, upload } = require("../../middlewares");
const {
  UserModel: { schemasUser },
} = require("../../models");
const { ctrlUsers } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemasUser.registerSchema), upload.single('avatar'),
  ctrlUsers.register);

router.get("/verify/:verificationToken", ctrlUsers.verifyEmail);

router.post("/verify", validateBody(schemasUser.verifySchema), ctrlUsers.resendVerifyEmail);

router.post("/login", validateBody(schemasUser.loginSchema), ctrlUsers.login) 

router.post("/logout", authenticate, ctrlUsers.logout); 

router.get("/current", authenticate, ctrlUsers.getCurrent); 

router.patch(
  "/:id/subscription",
  authenticate,
  isValidId,
  validateBody(schemasUser.updateSubscriptionSchema),
  ctrlUsers.updateSubscriptionUser
);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrlUsers.updateAvatar);

module.exports = router;