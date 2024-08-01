const yup = require("yup")

const { handleRouteErrors } = require("../../utils/utils")

const Transaction = require("../../models/Transaction")
const Account = require("../../models/Account")

const { TransactionType } = require("../../constants/constants")

const schema = yup.object({
    amount: yup.number().min(1).required()
})

const deposit = handleRouteErrors(async(req, res) => {
    const { amount } = await schema.validate(req.body)
    const account = await Account.findOne({ user: req.user._id })
    if(!account) return res.status(404).send({ message: "User doesn't have a bank account" })
    account.balance = account.balance + amount;
    await account.save()
    const transaction = new Transaction({
        type: TransactionType.Deposit,
        user: req.user._id,
        amount,
    })
    await transaction.save()
    res.status(200).send({ message: `${amount} deposited successfully` })
})

module.exports = deposit
