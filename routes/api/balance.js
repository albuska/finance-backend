const express = require("express");
// const { authenticate} = require("../../middlewares");
// const {
//   UserModel: { schemasUser },
// } = require("../../models");
const { ctrlBalance } = require("../../controllers");

const router = express.Router();

router.get("/balance", ctrlBalance.getGeneralBalance) 

router.post("/balance", ctrlBalance.postBalance) 

router.get("/balance/details", ctrlBalance.detailsBalance); 