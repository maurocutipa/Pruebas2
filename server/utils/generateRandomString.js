const crypto = require('crypto')
const showError = require('./showError')


const generateRandomString = () => {
    try {
        const buffer = crypto.randomBytes(16)
        return buffer.toString('base64url')
    } catch (error) {
        showError(error)
        return ''
    }
}


module.exports = generateRandomString