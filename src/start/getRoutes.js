const express = require("express")
const cors = require("cors")

const accounts = require("../routers/account")
const users = require("../routers/user")

const getRoutes = (app) => {
    app.use(express.json())
    app.use(cors({ origin: "*" }))
    app.use("/api/users", users)
    app.use("/api/accounts", accounts)
}

module.exports = getRoutes
