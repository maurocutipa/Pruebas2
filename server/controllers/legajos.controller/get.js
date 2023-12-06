const showError = require('@utils/showError');
const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const GetController = {}


GetController.getLegajoById = async (req, res) => {
    try {
        const fields = `
            lg.id_legajo as idLegajo,
            lg.letra,
            lg.nro_exp as nroExp,
            lg.fecha_ingreso as fechaIngreso,
            us.username as userIngreso,
            lg.id_denuncia as idDenuncia,
            lg.preso,
            lg.id_sector as idSector,
            lg.id_juridiccion as idJuridiccion,
            lg.femicidio,
            lg.deposito,
            lg.violencia_genero as violenciaGenero,
            lg.id_fiscal_encargado as idFiscalEncargado,
            lg.rac,
            lg.fecha_finalizacion as fechaFinalizacion,
            lg.completitud_que as completitudQue,
            lg.completitud_quien as completitudQuien,
            lg.completitud_donde as completitudDonde,
            lg.completitud_cuando as completitudCuando,
            lg.completitud_como as completitudComo,
            lg.evidencia_suficiente_que as evidenciaSuficienteQue,
            lg.evidencia_suficiente_quien as evidenciaSuficienteQuien,
            lg.evidencia_suficiente_donde as evidenciaSuficienteDonde,
            lg.evidencia_suficiente_cuando as evidenciaSuficienteCuando,
            lg.evidencia_suficiente_como as evidenciaSuficienteComo,
            lg.estado
        `

        let query = `SELECT ${fields} FROM legajo lg INNER JOIN usuarios us ON lg.id_user_ingreso = us.id_usuario WHERE lg.id_legajo = ? AND lg.estado = 1`;
        let result = await queryHandler(query, [req.params.id]);


        if (result.length === 0) {
            return res.status(404).json({
                message: 'No se encontró el legajo'
            });
        }

        return res.status(200).json({
            ok: true,
            data: result[0]
        });
    } catch (error) {
        showError(error);
        httpErrorHandler(res);
    }
}

GetController.getDenunciadosParaLegajo = async (req, res) => {
    const { id } = req.params;

    try {
        query = `
        SELECT 
          i.id,
          CONCAT(i.nombre, ' ', i.apellido) AS nombreCompleto,
          it.tipo_interviniente AS tipoInterviniente
        FROM interviniente_denuncia id
        LEFT JOIN interviniente i ON id.id_interviniente = i.id
        LEFT JOIN interviniente_tipo it ON i.id_interviniente_tipo = it.id_interviniente_tipo
        WHERE id_denuncia = ?`;
        const intervinientes = await queryHandler(query, [id]);

        if (!intervinientes[0]) {
            return res.status(404).json({
                message: `Intervinientes de denuncia id:${id} no existen`,
                data: { intervinientes },
            });
        }

        const denunciados = intervinientes.filter(
            (interviniente) => interviniente.tipoInterviniente === 'Denunciado'
        );

        res.status(200).json({
            message: 'ok',
            data: { denunciados },
        });
    } catch (error) {
        console.log(error);
        httpErrorHandler(res);
    }
};

GetController.getAccionTomada = async (req, res) => {
    const { id } = req.params;

    try {
        let query = `
          SELECT
            d.accion
          FROM denuncia d
          WHERE id_denuncia = ?`;

        const [denuncia] = await queryHandler(query, [id]);

        if (!denuncia) {
            return res.status(404).json({
                message: `Denuncia con el id: ${id} no existe`,
                data: { denuncia },
            });
        }

        res.status(200).json({
            message: 'Acciones tomadas',
            data: { seTomoAccion: !!denuncia.accion },
        });
    } catch (error) {
        console.log(error);
        httpErrorHandler(res);
    }
};

module.exports = GetController;