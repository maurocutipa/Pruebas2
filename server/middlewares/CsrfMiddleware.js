const { doubleCsrf } = require("csrf-csrf");


//environment variables
const CSRF_SECRET = process.env.CSRF_SECRET;
const CSRF_COOKIE_NAME = process.env.CSRF_COOKIE_NAME
const CSRF_COOKIE_PATH = process.env.CSRF_COOKIE_PATH
const CSRF_COOKIE_DOMAIN = process.env.CSRF_COOKIE_DOMAIN
const CSRF_COOKIE_SAMESITE = process.env.CSRF_COOKIE_SAMESITE
const CSRF_COOKIE_SECURE = process.env.CSRF_COOKIE_SECURE

const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: (req) => {
        req.secret; // A function that returns the secret for the request
    },
    secret: CSRF_SECRET,
    cookieName: CSRF_COOKIE_NAME,
    cookieOptions: {
        sameSite: CSRF_COOKIE_SAMESITE, 
        secure: CSRF_COOKIE_SECURE == 'true',
        httpOnly:true, 
        path: CSRF_COOKIE_PATH,
        domain:CSRF_COOKIE_DOMAIN
    },
    size: 128,
    ignoredMethods: [],
    getTokenFromRequest: (req) => req.headers["x-csrf-token"], // A function that returns the token from the request
});


//handlers
// Error handling, validation error interception
const csrfErrorHandler = (error, req, res, next) => {
    // Handing CSRF mismatch errors
    // For production use: send to a logger
    if (error == invalidCsrfTokenError) {
        res.status(403).json({
            ok: false,
            error: "CSRF Validation Error",
        });
    } else {
        next();
    }
};


module.exports = { invalidCsrfTokenError, generateToken, doubleCsrfProtection, csrfErrorHandler };
