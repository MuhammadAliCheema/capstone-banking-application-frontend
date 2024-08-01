const bcrypt = require("bcrypt")
const yup = require("yup")

const { handleRouteErrors } = require("../../utils/utils")

const User = require("../../models/User")

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
})

exports.login = handleRouteErrors(async(req, res) => {
    const { email, password } = await schema.validate(req.body)
    const user = await User.findOne({ email })
    if(!user) return res.status(400).send({ message: "Email or password incorrect" })
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) return res.status(400).send({ message: "Email or password incorrect" })
    const token = user.generateToken()
    res.status(200).send(token)
})
