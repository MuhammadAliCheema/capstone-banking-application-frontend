const { Router } = require("express")

const auth = require("../middleware/auth")

const deposit = require("../handlers/account/deposit")
const transfer = require("../handlers/account/transfer")
const withdraw = require("../handlers/account/withdraw")
const getAccount = require("../handlers/account/getAccount")
const getTransactions = require("../handlers/account/getTransactions")

const accounts = Router()

accounts.get("/", auth, getAccount)
accounts.post("/deposit", auth, deposit)
accounts.post("/withdraw", auth, withdraw)
accounts.post("/transfer", auth, transfer)
accounts.get("/transactions", auth, getTransactions)

module.exports = accounts
