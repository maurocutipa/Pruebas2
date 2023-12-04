const axios = require('axios')

const interntalAPI = axios.create({
    baseURL: `http://localhost:4000/api`,
    headers: {
        Accept: 'application/json',
    }
});


module.exports = { interntalAPI }