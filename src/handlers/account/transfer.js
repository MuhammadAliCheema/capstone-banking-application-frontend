const yup = require("yup")

const { handleRouteErrors } = require("../../utils/utils")

const Transaction = require("../../models/Transaction")
const Account = require("../../models/Account")
const User = require("../../models/User")

const { TransactionType } = require("../../constants/constants")

const schema = yup.object({
    amount: yup.number().min(1).required(),
    to: yup.string().required(),
})

const transfer = handleRouteErrors(async(req, res) => {
    const { amount, to } = await schema.validate(req.body)
    const user = await User.findOne({ _id: to })
    if(!user) return res.status(400).send({ message: "User doesn't have a bank account" })
    const account = await Account.findOne({ user: req.user._id })
    if(!account) return res.status(404).send({ message: "User doesn't have a bank account" })
    const targetAccount = await Account.findOne({ user: to })
    if(!account) return res.status(404).send({ message: "User doesn't have a bank account" })
    if(amount > account.balance)
        return res.status(400).send({ message: "Insufficient funds" })
    account.balance = account.balance - amount
    targetAccount.balance = targetAccount.balance + amount
    await account.save()
    await targetAccount.save()
    const transaction = new Transaction({
        type: TransactionType.Transfer,
        to,
        user: req.user._id,
        amount,
    })
    await transaction.save()
    res.status(200).send(account)
})

module.exports = transfer
