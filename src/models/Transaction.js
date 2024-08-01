const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    to: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }
}, { timestamps: true })

const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction
