const axios = require('axios')

const interntalAPI = axios.create({
    baseURL: `http://192.200.0.53:3000/api`,
    headers: {
        Accept: 'application/json',
    }
});


module.exports = { interntalAPI }