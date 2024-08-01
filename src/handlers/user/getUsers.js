const { handleRouteErrors } = require("../../utils/utils")

const User = require("../../models/User")

const getUsers = handleRouteErrors(async(req, res) => {
    const users = await User.find()
    if(!users?.length) return res.status(404).send({ message: "User not found" })
    res.status(200).send(users)
})

module.exports = getUsers
