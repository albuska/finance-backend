const express = require("express");
// const { authenticate} = require("../../middlewares");
// const {
//   UserModel: { schemasUser },
// } = require("../../models");
const { ctrlTransaction } = require("../../controllers");

const router = express.Router();

router.post("/transaction/:id", ctrlTransaction.postTransaction) 

router.delete("/transaction/:id", ctrlTransaction.deleteTransaction) 
