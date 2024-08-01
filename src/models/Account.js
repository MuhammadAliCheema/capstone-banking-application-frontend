const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    balance: {
        type: Number,
        required: true
    },
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }
}, { timestamps: true })

const Account = mongoose.model("Account", accountSchema)

module.exports = Account
