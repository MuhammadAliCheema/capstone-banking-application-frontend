const { handleRouteErrors } = require("../../utils/utils")

const Account = require("../../models/Account")

const getAccount = handleRouteErrors(async(req, res) => {
    const account = await Account.findOne({ user: req.user._id })
    if(!account) return res.status(404).send({ message: "User doesn't have a bank account" })
    res.status(200).send(account)
})

module.exports = getAccount
