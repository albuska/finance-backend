const express = require("express");
// const passport = require('passport');
const { authenticate, registerValidation, loginValidation, verifyValidation, passport } = require("../../middlewares/auth");
const { ctrlUsers } = require("../../controllers");
const router = express.Router();

router.get(
    '/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile']})
  );

  router.get(
    '/auth/google/callback',
    passport.authenticate('google',  { session: false }), ctrlUsers.googleAuth
  ); 

router.get("/verify/:verificationToken", ctrlUsers.verifyEmail);

router.post("/verify", ctrlUsers.resendVerifyEmail);

router.post("/auth/login", loginValidation, ctrlUsers.login) 

router.post("/auth/register", registerValidation, ctrlUsers.register) 

router.post("/auth/logout", authenticate, ctrlUsers.logout); 

// router.post("/auth/refresh", ctrlUsers.refresh) 

// router.get("/current", authenticate, ctrlUsers.getCurrent); 

// router.patch(
//   "/:id/subscription",
//   authenticate,
//   isValidId,
//   validateBody(schemasUser.updateSubscriptionSchema),
//   ctrlUsers.updateSubscriptionUser
// );

// router.patch("/avatars", authenticate, upload.single("avatar"), ctrlUsers.updateAvatar);

module.exports = router;