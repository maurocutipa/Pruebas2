const axios = require('axios')

const MAYKO_PC = '192.200.0.53'
const interntalAPI = axios.create({
    baseURL: `http://${MAYKO_PC}:3000/api`,
    headers: {
        Accept: 'application/json',
    }
});


module.exports = { interntalAPI }