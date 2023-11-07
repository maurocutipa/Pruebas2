/**
 * Retorna un error http como respuesta
 * @param {*} res Respuesta de la cual retornar el error
 * @param {*} code Codigo de retorno de la respuesta
 * @param {*} message Mensaje a incorporar en la respuesta
 * @param {*} ok Estado de la respuesta
 */
const HttpErrorHandler = (res, code = 500, message = "500 SERVER ERROR", ok = false, errors=undefined) => {
    if(process.env.NODE_ENV === 'production') errors = undefined
    res.status(code).json({
        ok,
        message,
        errors
    })
}

module.exports = HttpErrorHandler