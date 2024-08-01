const { handleRouteErrors } = require("../../utils/utils")

const User = require("../../models/User")

const getUser = handleRouteErrors(async(req, res) => {
    const user = await User.findOne({ _id: req.user._id })
    if(!user) return res.status(404).send({ message: "User not found" })
    res.status(200).send(user)
})

module.exports = getUser
