const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const safeConcatQuery = require('@utils/safeConcatQuery');
const showError = require('@utils/showError')

const PadronController = {}


PadronController.getByDni = async (req, res) => {
    try {
        let { dni } = req.params

        const query = "SELECT nombre,apellido,domicilio,sexo FROM padron_electoral WHERE matricula = ? LIMIT 1"

        const result = await queryHandler(query, [dni])

        if (result.length === 0) {
            res.status(404).json({
                ok: false,
                message: "No se encontró el dni",
            })
            return
        }

        res.status(200).json({
            ok: true,
            message: "Dni encontrado",
            data: result[0]
        })
        
    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}


module.exports = PadronController