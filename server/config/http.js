const axios = require('axios')

const interntalAPI = axios.create({
    baseURL: `http://${process.env.SERVER_NAME}:3000/api`,
    headers: {
        Accept: 'application/json',
    }
});


module.exports = { interntalAPI }