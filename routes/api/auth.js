const express = require("express");
const { authenticate} = require("../../middlewares");
// const {
//   UserModel: { schemasUser },
// } = require("../../models");
const { ctrlUsers } = require("../../controllers");

const router = express.Router();


// router.get("/verify/:verificationToken", ctrlUsers.verifyEmail);

// router.post("/verify", validateBody(schemasUser.verifySchema), ctrlUsers.resendVerifyEmail);

router.post("/auth/login", ctrlUsers.login) 

router.post("/auth/register", ctrlUsers.register) 

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