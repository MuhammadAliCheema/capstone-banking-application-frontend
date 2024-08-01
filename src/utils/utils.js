const { ValidationError } = require("yup")

const handleRouteErrors = (callback) => async(req, res, next) => {
    try {
        await callback(req, res, next)
    } catch (error) {
        console.error(error)
        if(error instanceof ValidationError)
            return res.status(400).send({ message: error.errors[0] })
        res.status(500).send({ message: "Internal Server Error" })
    }
}

exports.handleRouteErrors = handleRouteErrors
