const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const safeConcatQuery = require('@utils/safeConcatQuery');
const showError = require('@utils/showError')


const NotificacionesController = {};


NotificacionesController.getGrupos = async (req, res) => {

    try {

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

NotificacionesController.getPersonas = async (req, res) => {
    try {
        const { limit, offset } = req.body

        if(!limit || !offset){
            throw new Error("Faltan parametros")
        }

        let query = "SELECT nombre,apellido,email_institucional as email FROM usuarios LIMIT ? OFFSET ?"

        const data = await queryHandler(query, [limit, offset])

        res.status(200).json({
            ok: true,
            data
        })

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}


module.exports = NotificacionesController;


