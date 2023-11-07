const { errorLogger } = require('@config/log')


/**
 * Muestra los errores para debugear(no habilitado para produccion)
 * @param {*} error Error a mostrar
 */
const showError = (error) => {
    if(process.env.NODE_ENV !== 'production') console.log(error)
    else errorLogger.error(JSON.stringify(error))
}


module.exports = showError