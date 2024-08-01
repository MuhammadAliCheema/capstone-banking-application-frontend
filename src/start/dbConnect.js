const mongoose = require("mongoose")

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { ignoreUndefined: true })
        console.log("connected with database")
    } catch (error) {
        console.error("Failed to connect to database")
        console.error(error)
    }
}

module.exports = connectDb
