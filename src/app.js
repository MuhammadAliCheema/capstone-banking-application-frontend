const dotenv = require("dotenv")
dotenv.config()

const connectDb = require("./start/dbConnect")
connectDb()

const express = require("express")

const getRoutes = require("./start/getRoutes")

const app = express()
getRoutes(app)

const PORT = +process.env.PORT
app.listen(PORT, "172.17.240.1", () => console.log(`Backend at PORT: ${PORT}`))
