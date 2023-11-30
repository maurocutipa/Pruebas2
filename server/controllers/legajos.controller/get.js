const showError = require('@utils/showError');
const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const GetController = {}


GetController.getLegajoById = async (req, res) => {
    try {
        const fields = `
            id_legajo as idLegajo,
            letra,
            nro_exp as nroExp,
            fecha_ingreso as fechaIngreso,
            id_user_ingreso as idUserIngreso,
            id_denuncia as idDenuncia,
            preso,
            id_sector as idSector,
            id_juridiccion as idJuridiccion,
            femicidio,
            deposito,
            violencia_genero as violenciaGenero,
            id_fiscal_encargado as idFiscalEncargado,
            rac,
            fecha_finalizacion as fechaFinalizacion,
            completitud_que as completitudQue,
            completitud_quien as completitudQuien,
            completitud_donde as completitudDonde,
            completitud_cuando as completitudCuando,
            completitud_como as completitudComo,
            evidencia_suficiente_que as evidenciaSuficienteQue,
            evidencia_suficiente_quien as evidenciaSuficienteQuien,
            evidencia_suficiente_donde as evidenciaSuficienteDonde,
            evidencia_suficiente_cuando as evidenciaSuficienteCuando,
            evidencia_suficiente_como as evidenciaSuficienteComo,
            estado
        `

        let query = `SELECT ${fields} FROM legajo WHERE id_legajo = ? AND estado = 1`;
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