const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

//winston imports
const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "winston custom format";


//access log conf
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' })

const accessLog = morgan('combined', { stream: accessLogStream })


const errorLogger = createLogger({
    level: 'debug',
    format: format.prettyPrint(),
    transports: [
        //new transports:
        new transports.File({
            filename: "logs/error.log",
        }),
    ],
});


module.exports = { accessLog, errorLogger }