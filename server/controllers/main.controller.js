const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const safeConcatQuery = require('@utils/safeConcatQuery');
const convertToSnakeCase = require('@utils/convertToSnakeCase');
//const sendEmail = require('@utils/sendEmail')
const { matchedData } = require('express-validator');
const showError = require('@utils/showError')
//const { getComprobanteHtml } = require('@config/comprobante')
const generatePdf = require('@utils/generatePdf')
const dayjs = require('dayjs')
const denunciaTipos = require('@data/denunciaTipos')
const axios = require('axios')
const { interntalAPI } = require('@config/http')
const oneToManyHelper = require('@utils/oneToManyHelper')


MainController = {}

MainController.mainDenunciaCreate = async (req, res) => {
    try {
        //console.log(req)

        let { denuncia, intervinientes, denunciantes, victimasRelaciones } = matchedData(req)
        if(!denunciaTipos[denuncia.idTipoDenuncia]) throw new Error('Id tipo denuncia no valido')
        denuncia.url = denunciaTipos[denuncia.idTipoDenuncia].url
        denuncia.enable = denunciaTipos[denuncia.idTipoDenuncia].enable
        

        //formateo de fechas y horas
        intervinientes = intervinientes.map(int => {
            return {
                ...int,
                fechaNacimiento: dayjs(int.fechaDenuncia).format('YYYY-MM-DD')
            }
        })
        denunciantes = denunciantes.map(int => {
            return {
                ...int,
                fechaNacimiento: dayjs(int.fechaDenuncia).format('YYYY-MM-DD')
            }
        })

        denuncia.fechaHecho = dayjs(denuncia.fechaHecho).format('YYYY-MM-DD')
        denuncia.horaHecho = dayjs(denuncia.horaHecho).format('hh:mm:ss')


        //DENUNCIA
        let idDenuncia
        ({ data: { id: idDenuncia } } = await interntalAPI.post('/denuncias/general-create', denuncia))

        let intervinientesId = []

        //INTERVININIENTES
        intervinientes && (
            intervinientesId = await Promise.all(
                intervinientes.map(async interviniente => {
                    const intData = await interntalAPI.post('/intervinientes/create', interviniente)
                    return intData.data.id
                })
            )
        )

        //DENUNCIANTES
        let denunciantesIds = []
        denunciantes && (
            denunciantesIds = await Promise.all(denunciantes.map(async denunciante => {
                const denuncianteData = await interntalAPI.post('/intervinientes/create', denunciante)
                return denuncianteData.data.id
            }))
        )

        //DENUNCIA-VICTIMA
        victimasRelaciones && (
            await Promise.all(victimasRelaciones.map(async (datos, index) => {
                await interntalAPI.post('/intervinientes/interviniente-victima-create', {
                    ...datos,
                    idDenuncia,
                    idInterviniente: denunciantesIds[index]
                })
                return undefined
            }))
        )

        //INTERVINIENTE-DENUNCIA
        await Promise.all([...denunciantesIds, ...intervinientesId].map(async (idInterviniente) => {
            const denIntData = await interntalAPI.post('/intervinientes/interviniente-denuncia-create', {
                idDenuncia,
                idInterviniente
            })
        }))

        //SUBA-ARCHIVOS (solo denuncia adjuntos)
        req.files && await Promise.all(req.files.map((file) => {

            let query = `INSERT INTO denuncia_adjuntos(id_denuncia, nombre_original, nombre_archivo, fecha, estado) VALUES(?,?,?,NOW(),1)`
            if (file.fieldname == 'filedni')
                query = `INSERT INTO interviniente_dni (id_denuncia, nombre_original, nombre_archivo, fecha_archivo, estado) VALUES(?,?,?,NOW(),1)`

            //TODO: add id interveniente
            return queryHandler(query, [idDenuncia, file.originalname, file.filename])
        }))


        //DENUNCIA ESPECIFICA
        if (denuncia.url && denuncia.enable) {

            let idDenunciaEsp
            ({ data: { id: idDenunciaEsp } } = await interntalAPI.post(`/denuncias/${denuncia.url}`, {
                ...denuncia,
                idDenuncia
            }))

            //incidentes viales vehiculos
            if(denuncia.vehiculoIncidentes && denuncia.idTipoDenuncia == 6) 
                await oneToManyHelper('/denuncias/incidente-vial-vehiculo-create', denuncia.vehiculoIncidentes, 'idDenunciaIncidentesViales')


            //DENUNCIA PROPIEDAD (automoviles, autopartes,bicicletas, cheques, documentacion, otro, tarjetas, telefonos)
            if (denuncia.propiedades && denuncia.idTipoDenuncia == 3) {
                denuncia.propiedades.automoviles && await oneToManyHelper('/objetos-propiedad/automoviles', denuncia.propiedades.automoviles, idDenunciaEsp, 'idDenunciaPropiedad')
                denuncia.propiedades.autopartes && await oneToManyHelper('/objetos-propiedad/autopartes', denuncia.propiedades.autopartes, idDenunciaEsp, 'idDenunciaPropiedad')
                denuncia.propiedades.bicicletas && await oneToManyHelper('/objetos-propiedad/bicicletas', denuncia.propiedades.bicicletas, idDenunciaEsp, 'idDenunciaPropiedad')
                denuncia.propiedades.cheques && await oneToManyHelper('/objetos-propiedad/cheques', denuncia.propiedades.cheques, idDenunciaEsp, 'idDenunciaPropiedad')
                denuncia.propiedades.documentacion && await oneToManyHelper('/objetos-propiedad/documentacion', denuncia.propiedades.documentacion, idDenunciaEsp, 'idDenunciaPropiedad')
                denuncia.propiedades.otro && await oneToManyHelper('/objetos-propiedad/otro', denuncia.propiedades.otro, idDenunciaEsp, 'idDenunciaPropiedad')
                denuncia.propiedades.tarjetas && await oneToManyHelper('/objetos-propiedad/tarjetas', denuncia.propiedades.tarjetas, idDenunciaEsp, 'idDenunciaPropiedad')
                denuncia.propiedades.telefonos && await oneToManyHelper('/objetos-propiedad/telefonos', denuncia.propiedades.telefonos, idDenunciaEsp, 'idDenunciaPropiedad')
            }

            //ABIGEATO DETALLES 
            if(denuncia.abigeatoDetalles && denuncia.idTipoDenuncia == 14)
                await oneToManyHelper('/denuncias/abigeato-detalle-create', denuncia.abigeatoDetalles, idDenunciaEsp, 'idDenunciaAbigeato')
        }

        

        //ENVIO DE CORREO
        if (denunciantes && denunciantes.length) {
            let localidad, barrio
            if(denuncia.certezaLugar){
                localidad = await queryHandler(`select nombre  from localidades where id_localidad = ?`, [denuncia.idLocalidad])
                barrio = await queryHandler(`select nombre_barrio as nombre from barrios where id_barrio = ?`, [denuncia.idBarrio])
            }
            
            const [tipoDenuncia] = await queryHandler(`select nombre from denuncia_tipos where id_tipo_denuncia = ? limit 1`, [denuncia.idTipoDenuncia])
            const [fechaHora] = await queryHandler(`select fecha_denuncia,hora_denuncia from denuncia where id_denuncia = ?`, [idDenuncia])

            
            /*
            await generatePdf(getComprobanteHtml({
                denuncia: {
                    ...denuncia,
                    localidad: (localidad && localidad.length && localidad[0] && localidad[0].nombre) || "Sin especificar",
                    barrio: (barrio && barrio.length && barrio[0] && barrio[0].nombre) ||  "Sin especificar",
                    tipoDenuncia: (tipoDenuncia && tipoDenuncia.nombre) || "Sin especificar",
                    fechaDenuncia: (fechaHora && dayjs(fechaHora.fecha_denuncia).format('DD/MM/YYYY')) || "Sin especificar",
                    horaDenuncia: (fechaHora && fechaHora.hora_denuncia.toString()) || "Sin especificar",
                    detalleAdjunto: denuncia.detalleAdjunto? denuncia.detalleAdjunto:'Sin detalles',
                    idDenuncia,
                },
                denunciantes,
                victimasRelaciones,
                victimas: intervinientes.filter(int => int.idIntervinienteTipo == 1 || int.idIntervinienteTipo == 3),
                denunciados: intervinientes.filter(int => int.idIntervinienteTipo == 5),
                testigos: intervinientes.filter(int => int.idIntervinienteTipo == 9),
                adjuntos: req.files.map(file => ({nombre:file.originalname})) || [
                    {
                        nombre: 'mayko.jpg'
                    },{
                        nombre: 'comprobante.pdf'
                    }
                ]
            }))
            denunciantes.forEach(den => {
                //sendEmail(den.email)
            })
            */
        }

        res.status(200).json({
            ok: true,
            message: "Denuncia creada",
            idDenuncia,
            email: denunciantes[0] && denunciantes[0].email
        })

    } catch (error) {
        if(error instanceof axios.AxiosError)
        {
            showError(error.response.statusText + ' ' + error.request.path)
            res.status(error.response.status).json(error.response.data)
        }
        else {
            showError(error)
            httpErrorHandler(res,500,"500 SERVER ERROR",false,error.message)
        }
    }
}


module.exports = { ...MainController }