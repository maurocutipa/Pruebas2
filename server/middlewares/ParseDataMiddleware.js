const showError = require('@utils/showError')

const ParseDataMiddleware = async (req, res, next) => {
    try {
        req.body = JSON.parse(req.body.data)
        next()
    } catch (error) {
        showError(error)
        res.status(500).json({
            ok: false,
            message: '500 SERVER ERROR'
        })
    }
}


module.exports = ParseDataMiddleware