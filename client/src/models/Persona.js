export class Persona {
    constructor(
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
    ) {
        this.id = id;
        this.tipoIdentificacion = tipoIdentificacion;
        this.numeroIdentificacion = numeroIdentificacion;
        this.nombre = nombre;
        this.apellido = apellido;
        this.alias = alias;
        this.identidadAutopercibida = identidadAutopercibida;
        this.fechaNacimiento = fechaNacimiento;
        this.idPais = idPais;
        this.idProvincia = idProvincia;
        this.idLocalidad = idLocalidad;
        this.idBarrio = idBarrio;
        this.domicilio = domicilio;
        this.latitud = latitud;
        this.longitud = longitud;
        this.telefonoFijo = telefonoFijo;
        this.telefonoMovil = telefonoMovil;
        this.email = email;
        this.idIntervinienteTipo = idIntervinienteTipo;
    }
}