//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");

// Read HTML Template
var html = fs.readFileSync(__dirname + "/../static/comprobante.html", "utf8");

var options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "45mm",
    contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
  },
  footer: {
    height: "28mm",
    contents: {
      first: 'Cover page',
      default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: 'Last Page'
    }
  }
};

/*

{
    "descripcionQue": "obligatorio",
    "descripcionComo": "obligatorio",
    "certezaFecha":"obligatorio 0 o 1",
    "fechaHecho":"depende de certezaFecha",
    "horaHecho":"depende de certezaFecha",
    "detalleFecha":"depende de certezaFecha",
    "certezaLugar":"obligatorio 0 o 1",
    "idLocalidad" :"depende de certezaLugar",
    "calleHecho":"depende de certezaLugar",
    "numCalle":"depende de certezaLugar",
    "latitudHecho":"depende de certezaLugar",
    "longitudHecho":"depende de certezaLugar",

    "informacionAdicional":"opcional",
    "anonimo":"obligatorio 0 o 1",
    "datosDenunciado":"obligatorio 0 o 1",
    "testigo":"obligatorio 0 o 1",
    "datosTestigo":"obligatorio 0 o 1",
    "idTipoDenuncia":"obligatorio"
}

*/

// By default a file is created but you could switch between Buffer and Streams by using "buffer" or "stream" respectively.



/**
 * Crea el comprobante PDF para la denuncia enviada
 * @param {any} denuncia denuncia completa
 * @param {any} intervinientes intervinientes (denunciados,testigos,victimas)
 * @param {any} denunciantes denunciantes
 * @param {any} victimasRelaciones relaciones de las victimas con los denunciantes
 */
const convertToPdf = async (denuncia, intervinientes, denunciantes, victimasRelaciones) => {

  denuncia = {
    "idTipoDenuncia":1,
    "fechaDenuncia":"01-01-2023",
    "horaDenuncia":"10:00:00",
    "tipoDenuncia": "Robo",
    "descripcionQue": "obligatorio",
        "descripcionComo": "obligatorio",

        "certezaFecha":1,
        "detalleFecha":"depende de certezaFecha",

        "fechaHecho":"2023-10-30",
        "horaHecho":"14:30:00",

        "certezaLugar":1,
        "idLocalidad" :1,
        "idBarrio":2,
        
        "calleHecho":"depende de certezaLugar",
        "numCalle":"depen",

        "latitudHecho":"depende de certezaLugar",
        "longitudHecho":"depende de certezaLugar",

        "informacionAdicional":"opcional",
        "anonimo":1,
        "datosDenunciado": 0,
        "testigo":1,
        "datosTestigo":0
  }
  intervinientes = [
    { 
      "nombre":"obligatorio",
      "apellido":"obligatorio",
      "tipoIdentificacion":"obligatorio",
      "numeroIdentificacion":"obligatorio",
      "alias":"opcional",
      "identidadAutopercibida":"opcional",
      "fechaNacimiento":"2023-10-30",
      "idPais":1,
      "domicilio":"nose",
      "idProvincia":1,
      "idBarrio":1,
      "idLocalidad":1,
      "direccion":"nose",
      "telefonoFijo":"38887878",
      "telefonoMovil":"788787",
      "email":"asd@asd",
      "tipoPersona":"Fisica",
      "idIntervinienteTipo":1,

      "informacionAdicional":"opcional",
      "concurso":"opcional",
      "autoriaParticipacion":"opcional",
      "grado":"opcional"
  },
    {
      "nombre":"obligatorio2",
      "apellido":"obligatorio",
      "tipoIdentificacion":"obligatorio",
      "numeroIdentificacion":"obligatorio",
      "alias":"opcional",
      "identidadAutopercibida":"opcional",
      "fechaNacimiento":"2023-10-30",
      "idPais":1,
      "domicilio":"nose",
      "idProvincia":1,
      "idBarrio":1,
      "idLocalidad":1,
      "direccion":"nose",
      "telefonoFijo":"38887878",
      "telefonoMovil":"788787",
      "email":"asd@asd",
      "tipoPersona":"Fisica",
      "idIntervinienteTipo":5,

      "informacionAdicional":"opcional",
      "concurso":"opcional",
      "autoriaParticipacion":"opcional",
      "grado":"opcional"
    },
  {
      "nombre":"obligatorio3",
      "apellido":"obligatorio",
      "tipoIdentificacion":"obligatorio",
      "numeroIdentificacion":"obligatorio",
      "alias":"opcional",
      "identidadAutopercibida":"opcional",
      "fechaNacimiento":"2023-10-30",
      "idPais":1,
      "domicilio":"nose",
      "idProvincia":1,
      "idBarrio":1,
      "idLocalidad":1,
      "direccion":"nose",
      "telefonoFijo":"38887878",
      "telefonoMovil":"788787",
      "email":"asd@asd",
      "tipoPersona":"Fisica",
      "idIntervinienteTipo":9,

      "informacionAdicional":"opcional",
      "concurso":"opcional",
      "autoriaParticipacion":"opcional",
      "grado":"opcional"
  }
  ]

  // denunciantes = []

  try {
    var document = {
      html: html,
      data: {
        denuncia:denuncia,
        intervinientes:intervinientes,
        denunciantes,
        victimasRelaciones
      },
      path: ".cache/comprobante.pdf",
      type: "",
    };

    const res = await pdf.create(document, options)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = convertToPdf;