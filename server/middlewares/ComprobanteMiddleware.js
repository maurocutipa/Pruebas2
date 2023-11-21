const HttpErrorHandler = require("../utils/httpErrorHandler")
const queryHandler = require("../utils/queryHandler")
const showError = require("../utils/showError")
const generatePdf = require("../utils/generatePdf")
const { getComprobanteHtml } = require('@config/comprobante')
//const sendEmail = require('@utils/sendEmail')
const dayjs = require('dayjs')

const ComprobanteMiddleware = async (req, res, next) => {
    try {

        let { denuncia, denunciantes, intervinientes, victimasRelaciones } = req

        const localidades = await queryHandler(`select id_localidad as id, nombre from localidades`)
        const barrios = await queryHandler(`select id_barrio as id, nombre_barrio as nombre from barrios`)
        const nacionalidades = await queryHandler('select id_interviniente_nacionalidad as id, nacionalidad as nombre from interviniente_nacionalidad where estado = 1')
        const provincias = await queryHandler('select id_provincia as id, nombre_provincia as nombre from provincias')


        const [tipoDenuncia] = await queryHandler(`select nombre from denuncia_tipos where id_tipo_denuncia = ? limit 1`, [denuncia.idTipoDenuncia])
        const [fechaHora] = await queryHandler(`select fecha_denuncia,hora_denuncia from denuncia where id_denuncia = ?`, [denuncia.idDenuncia])

        const usuario = await queryHandler(`select nombre, apellido, grado from usuarios`)

        if(denuncia.certezaLugar){
            denuncia.barrio = barrios.filter(barrio => barrio.id = denuncia.idBarrio)[0].nombre
            denuncia.localidad = localidades.filter(localidad => localidad.id = denuncia.idLocaidad)[0].nombre
        }


        //add nacionalidad,provincia,localidad,barrio para intervinientes
        //TODO: check if exist 0 position
        intervinientes = intervinientes.map(int => {
            return {
                ...int,
                nacionalidad: nacionalidades.filter(nac => nac.id = int.idPais)[0] && nacionalidades.filter(nac => nac.id = int.idPais)[0].nombre,
                barrio: barrios.filter(barrio => barrio.id = int.idBarrio)[0] && barrios.filter(barrio => barrio.id = int.idBarrio)[0].nombre,
                provincia: provincias.filter(prov => prov.id = int.idProvincia)[0] && provincias.filter(prov => prov.id = int.idProvincia)[0].nombre,
                localidad: localidades.filter(loc => loc.id = int.idLocalidad)[0] && localidades.filter(loc => loc.id = int.idLocalidad)[0].nombre
            }
        })
        denunciantes = denunciantes.map(den => {
            return {
                ...den,
                nacionalidad: nacionalidades.filter(nac => nac.id = den.idPais)[0] && nacionalidades.filter(nac => nac.id = den.idPais)[0].nombre,
                barrio: barrios.filter(barrio => barrio.id = den.idBarrio)[0] && barrios.filter(barrio => barrio.id = den.idBarrio)[0].nombre,
                provincia: provincias.filter(prov => prov.id = den.idProvincia)[0] && provincias.filter(prov => prov.id = den.idProvincia)[0].nombre,
                localidad: localidades.filter(loc => loc.id = den.idLocalidad)[0] && localidades.filter(loc => loc.id = den.idLocalidad)[0].nombre
            }
        })

        await generatePdf(getComprobanteHtml({
            denuncia: {
                ...denuncia,
                tipoDenuncia: (tipoDenuncia && tipoDenuncia.nombre) || "Sin especificar",
                fechaDenuncia: (fechaHora && dayjs(fechaHora.fecha_denuncia).format('DD/MM/YYYY')) || "Sin especificar",
                horaDenuncia: (fechaHora && fechaHora.hora_denuncia.toString()) || "Sin especificar",
                detalleAdjunto: denuncia.detalleAdjunto ? denuncia.detalleAdjunto : 'Sin detalles',
            },
            denunciantes,
            victimasRelaciones,
            victimas: intervinientes.filter(int => int.idIntervinienteTipo == 1 || int.idIntervinienteTipo == 3),
            denunciados: intervinientes.filter(int => int.idIntervinienteTipo == 5),
            testigos: intervinientes.filter(int => int.idIntervinienteTipo == 9),
            adjuntos: req.files.map(file => ({ nombre: file.originalname })) || [],
            //BUSQUEDA PERSONAS
            usuario: {
                nombre: "ejemplo",
                apellido: "ejemplo",
                lugar: "San salvador",
                fuerza: "Ejemplo"
            }
            
        }))

        
        //AUDITORIA
        req.actividad = "CREAR DENUNCIA"
        req.idUsuario = 2 //test
        req.denuncia.tipoDenuncia = (tipoDenuncia && tipoDenuncia.nombre) || "Sin especificar",
        next()

        /* denunciantes.forEach(den => {
            sendEmail(den.email)
        }) */

        res.status(200).json({
            ok: true,
            message: "Denuncia creada",
            idDenuncia: denuncia.idDenuncia,
            email: denunciantes[0] && denunciantes[0].email
        })
    } catch (error) {
        showError(error)
        HttpErrorHandler(res)
    }
}


module.exports = ComprobanteMiddleware