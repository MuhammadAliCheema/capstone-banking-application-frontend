const bcrypt = require("bcrypt")
const yup = require("yup")

const { handleRouteErrors } = require("../../utils/utils")

const Account = require("../../models/Account")
const User = require("../../models/User")

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
})

exports.signup = handleRouteErrors(async(req, res) => {
    const validated = await schema.validate(req.body)
    const exists = await User.findOne({ email: validated.email })
    if(exists) return res.status(400).send({ message: "User already exists" })
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(validated.password, salt)
    validated.password = hashedPassword
    const user = new User(validated)
    await user.save()
    const account = new Account({
        balance: 0,
        user: user._id
    })
    await account.save()
    const token = user.generateToken()
    res.status(200).send(token)
})
