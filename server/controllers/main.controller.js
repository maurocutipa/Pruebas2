const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const safeConcatQuery = require('@utils/safeConcatQuery');
const convertToSnakeCase = require('@utils/convertToSnakeCase');
//const sendEmail = require('@utils/sendEmail')
const { matchedData } = require('express-validator');
const showError = require('@utils/showError')
const { getComprobanteHtml } = require('@config/comprobante')
const generatePdf = require('@utils/generatePdf')
const dayjs = require('dayjs')
const denunciaTipos = require('@data/denunciaTipos')
const axios = require('axios')
const { interntalAPI } = require('@config/http')
const oneToManyHelper = require('@utils/oneToManyHelper')


MainController = {}

MainController.mainDenunciaCreate = async (req, res, next) => {
    try {

        //TODO: desencriptar token, agarrar ip

        //console.log(req)
        let { denuncia, intervinientes, denunciantes, victimasRelaciones, idUsuario } = matchedData(req)
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
        denuncia.idDenuncia = idDenuncia



        let intervinientesId = []
        let idIntervinienteVictima = 0
        //INTERVININIENTES
        intervinientes && (
            intervinientesId = await Promise.all(
                intervinientes.map(async interviniente => {
                    const intData = await interntalAPI.post('/intervinientes/create', interviniente)
                    if(interviniente.idIntervinienteTipo == 1) idIntervinienteVictima = intData.data.id //id de victima para busqueda personas
                    return intData.data.id
                })
            )
        )

        //DENUNCIANTES
        denunciantes && (
            denunciantes = await Promise.all(denunciantes.map(async denunciante => {
                const denuncianteData = await interntalAPI.post('/intervinientes/create', denunciante)
                return {
                    idInterviniente: denuncianteData.data.id,
                    ...denunciante
                }
            }))
        )

        //DENUNCIA-VICTIMA
        victimasRelaciones && (
            await Promise.all(victimasRelaciones.map(async (datos, index) => {
                await interntalAPI.post('/intervinientes/interviniente-victima-create', {
                    ...datos,
                    idDenuncia,
                    idInterviniente: denunciantes[index].idInterviniente
                })
                return undefined
            }))
        )

        //INTERVINIENTE-DENUNCIA
        await Promise.all([...(denunciantes.map(den => den.idInterviniente)), ...intervinientesId].map(async (idInterviniente) => {
            const denIntData = await interntalAPI.post('/intervinientes/interviniente-denuncia-create', {
                idDenuncia,
                idInterviniente
            })
        }))


        //SUBA-ARCHIVOS (solo denuncia adjuntos)
        req.files && await Promise.all(req.files.map((file) => {
            
            //SUBA ARCHIVOS DNI INTERVINIENTE
            if (file.fieldname == 'filedni') {

                const idFile = parseInt(file.originalname.split('_')[0])
                
                let [denunciante] = denunciantes.filter(den => den.fotosIdentificacion.includes(idFile))
                if(!denunciante)
                    denunciante = intervinientes.filter(int => int.fotosIdentificacion && int.fotosIdentificacion.includes(idFile) && (int.idIntervinienteTipo == 1 || int.idIntervinienteTipo == 3))[0]

                if(!denunciante) throw new Error('No se pudo asociar algun interviniente con sus fotos de identificacion')

                const originalname = file.originalname.substring(file.originalname.indexOf('_') + 1)

                const query = `INSERT INTO interviniente_dni (id_denuncia, nombre_original, nombre_archivo, fecha_archivo, estado, id_interviniente) VALUES(?,?,?,NOW(),1,?)`
                return queryHandler(query, [idDenuncia, originalname, file.filename, denunciante.idInterviniente])
            }

            //SUBA ARCHIVOS DENUNCIA
            const query = `INSERT INTO denuncia_adjuntos(id_denuncia, nombre_original, nombre_archivo, fecha, estado) VALUES(?,?,?,NOW(),1)`
            return queryHandler(query, [idDenuncia, file.originalname, file.filename])
        }))


        //DENUNCIA ESPECIFICA
        if (denuncia.url && denuncia.enable) {

            let idDenunciaEsp
            ({ data: { id: idDenunciaEsp } } = await interntalAPI.post(`/denuncias/${denuncia.url}`, {
                ...denuncia,
                idDenuncia,
                idInterviniente: idIntervinienteVictima
            }))

            //incidentes viales vehiculos
            if (denuncia.vehiculosIncidentes && denuncia.idTipoDenuncia == 6)
                await oneToManyHelper('/denuncias/incidente-vial-vehiculo-create', denuncia.vehiculosIncidentes, 'idDenunciaIncidentesViales')


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
            if (denuncia.abigeatoDetalles && denuncia.idTipoDenuncia == 14)
                await oneToManyHelper('/denuncias/abigeato-detalle-create', denuncia.abigeatoDetalles, idDenunciaEsp, 'idDenunciaAbigeato')
        }


        if (denunciantes && denunciantes.length) {
            req.denuncia = denuncia
            req.intervinientes = intervinientes
            req.denunciantes = denunciantes
            req.victimasRelaciones = victimasRelaciones
            next()
        }
        else {
            res.status(200).json({
                ok: true,
                message: "Denuncia creada",
                idDenuncia,
                email: denunciantes[0] && denunciantes[0].email
            })
        }
    } catch (error) {
        if (error instanceof axios.AxiosError) {
            showError(error.response.statusText + ' ' + error.request.path)
            res.status(error.response.status).json(error.response.data)
        }
        else {
            showError(error)
            httpErrorHandler(res, 500, "500 SERVER ERROR", false, error.message)
        }
    }
}


module.exports = { ...MainController }