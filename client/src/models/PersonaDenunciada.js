import { Persona } from "./Persona";

export class PersonaDenunciada extends Persona {
    constructor( id,
        tipoIdentificacion,
        numeroIdentificacion,
        nombre,
        apellido,
        alias,
        identidadAutopercibida,
        fechaNacimiento,
        idPais,
        idProvincia,
        idLocalidad,
        idBarrio,
        domicilio,
        latitud,
        longitud,
        telefonoFijo,
        telefonoMovil,
        email,
        idIntervinienteTipo,
        tipoPersona,
        conocimientoDatosPersonales,
        informacionAdicional) {
        super(
            id,
            tipoIdentificacion,
            numeroIdentificacion,
            nombre,
            apellido,
            alias,
            identidadAutopercibida,
            fechaNacimiento,
            idPais,
            idProvincia,
            idLocalidad,
            idBarrio,
            domicilio,
            latitud,
            longitud,
            telefonoFijo,
            telefonoMovil,
            email,
            idIntervinienteTipo
        );
        this.tipoPersona = tipoPersona
        this.conocimientoDatosPersonales = conocimientoDatosPersonales;
        this.informacionAdicional = informacionAdicional
    }
}