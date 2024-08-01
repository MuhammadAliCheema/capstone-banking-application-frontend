const { handleRouteErrors } = require("../../utils/utils")

const Transaction = require("../../models/Transaction")

const getTransactions = handleRouteErrors(async(req, res) => {
    const transactions = await Transaction
        .find({ user: req.user._id })
        .populate("to")
    res.status(200).send(transactions)
})

module.exports = getTransactions
