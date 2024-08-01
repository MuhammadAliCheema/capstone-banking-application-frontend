const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

userSchema.methods.generateToken = function() {
    const userInstance = this;
    return jwt.sign({
        _id: userInstance._id,
        firstName: userInstance.firstName,
        lastName: userInstance.lastName,
        email: userInstance.email
    }, process.env.JWT_SECRET)
}

const User = mongoose.model("User", userSchema)

module.exports = User
