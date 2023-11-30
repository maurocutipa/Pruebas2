import { Persona } from "./Persona";

export class PersonaDenunciante extends Persona {
    constructor(id,
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
        fotosIdentificacion,
        //exclusivo Denunciante
        conocimientoVictima,
        vinculoVictima,
        detalleVinculo
    ) {
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
        this.fotosIdentificacion = fotosIdentificacion
        this.conocimientoVictima = conocimientoVictima
        this.vinculoVictima = vinculoVictima
        this.detalleVinculo = detalleVinculo
    }
}