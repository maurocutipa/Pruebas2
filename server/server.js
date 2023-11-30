const loadEnvironment = require('./utils/loadEnv')
//Environment
loadEnvironment()

require('module-alias/register')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const http = require('http')
const https = require('https')
const fs = require('fs')
const compression = require("compression");
const RateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const { generateToken } = require("./middlewares/CsrfMiddleware");
const showError = require('@utils/showError')
const { accessLog } = require('@config/log')

const port = process.env.PORT || 3000
const host = process.env.SERVER_NAME

//init app
const app = express()
//MIDDLEWARES

//development middlewares
if (process.env.NODE_ENV !== 'production') {
  // only use in development
  
}

//logger
app.use(accessLog)

//for reverse proxy
app.set('trust proxy', '127.0.0.1');

//cookie settings
app.use(cookieParser(process.env.COOKIE_SECRET));

//rate settings
const limiter = RateLimit({
  windowMs: 200, // 5 per second
  max: 20,
});
app.use(limiter);

//compression
app.use(compression())
app.use(express.urlencoded({extended:false}))
//cors
app.use(cors({
  origin: (origin, callback) => {
    try {
      if (process.env.APP_DOMAIN.split(',').indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") callback(null, true)
      else throw new Error('Not allowed by CORS')
    } catch (error) {
      callback(error)
    }
  },
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token', 'Accept', 'Content-Length'],
  credentials: true
}))

//body json
app.use(express.json())

//secure middleware
app.use(helmet())

//error handler for syntax error
app.use((err, req, res, next) => {
  if (err) {
    showError(err)
    return res.status(500).send({ ok: false, message: "500 SERVER ERROR" });
  }
  next();
});

//ROUTES CONFIG


//MAIN ROUTES
app.use('/api', require('./routes'))
app.use(express.static('static'))
app.use(express.static('uploads'))

//csrf route
app.get("/api/csrf-token", (req, res) => {
  return res.json({
    token: generateToken(req,res,true),
  });
});

//SERVER CONFIG
const server = process.env.NODE_ENV == 'production'? https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: ''
},app) : http.createServer(app)

server.listen(port, host, () => {
  console.log(`Server started on: ${host}:${port}`)
})
