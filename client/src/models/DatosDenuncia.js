export class DatosDenuncia {
    constructor(descripcionQue,
        descripcionComo,
        certezaFecha,
        fechaHecho,
        horaHecho,
        detalleFecha,
        certezaLugar,
        idLocalidad,
        idBarrio,
        calleHecho,
        numCalle,
        latitudHecho,
        longitudHecho,
        pisoHecho,
        departamentoHecho,
        informacionAdicional,
        anonimo,
        datosDenunciado,//Al pedo
        testigo,
        datosTestigo,
        idTipoDenuncia,
        detalleAdjunto,
        propiedad, //roboHurto
        vehiculosIncidentes //incidente vial
        ) {
        this.descripcionQue = descripcionQue;
        this.descripcionComo = descripcionComo;
        this.certezaFecha = certezaFecha;
        this.fechaHecho = fechaHecho;
        this.horaHecho = horaHecho;
        this.detalleFecha = detalleFecha;
        this.certezaLugar = certezaLugar;;
        this.idLocalidad = idLocalidad;
        this.idBarrio = idBarrio;
        this.calleHecho = calleHecho;
        this.numCalle = numCalle;
        this.latitudHecho = latitudHecho;
        this.longitudHecho = longitudHecho;
        this.pisoHecho = pisoHecho;
        this.departamentoHecho = departamentoHecho;
        this.pisoHecho = pisoHecho;
        this.departamentoHecho = departamentoHecho;
        this.informacionAdicional = informacionAdicional;
        this.anonimo = anonimo;
        this.datosDenunciado = datosDenunciado;
        this.testigo = testigo;
        this.datosTestigo = datosTestigo;
        this.idTipoDenuncia = idTipoDenuncia;
        this.detalleAdjunto = detalleAdjunto;
        this.propiedad = propiedad; //roboHurto
        this.vehiculosIncidentes = vehiculosIncidentes;//incidente vial
    }

}