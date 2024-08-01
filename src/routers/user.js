const { Router } = require("express")

const auth = require("../middleware/auth")

const getUser = require("../handlers/user/getUser")
const { login } = require("../handlers/user/login")
const { signup } = require("../handlers/user/signup")
const getUsers = require("../handlers/user/getUsers")

const users = Router()

users.get("/all", auth, getUsers)
users.get("/", auth, getUser)
users.post("/login", login)
users.post("/signup", signup)

module.exports = users
