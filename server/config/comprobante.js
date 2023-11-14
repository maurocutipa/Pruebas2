let denunciantes = []
let denunciados = []
let testigos = []
let victimas = []
let denuncia = {}
let adjuntos = []

// const defaultValues = {
//   denuncia,
//   denunciantes,
//   involucrados,
//   adjuntos
// }

const getComprobanteHtml = ({denuncia,denunciantes,victimasRelaciones,testigos,denunciados,victimas,adjuntos}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!--<link href="./static/css/bootstrap.min.css" rel="stylesheet">-->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
            .hojaA4{
                width: 210mm;
                height: 300mm;
                margin: 0 auto;
            }
            </style>
        </head>
    
        <body>
            <div id="contenedorBase">
                <div class="px-3" id="item1">
                    <div class="d-flex justify-content-center align-items-center">
                        <img src="https://sistema.mpajujuy.gob.ar/images/logompa2.png" alt="Logo MPA" class="img-fluid w-25 h-25">
                    </div>
                    <div class="mb-4 d-grid">
                        <h3 class="fw-bold col">Datos Generales:</h3>
                        <div class="ps-3 col d-grid d-flex flex-wrap">
                            <p class="col-6"><span class="fw-medium fs-5">Nro. Denuncia:</span> <span class="fs-5">${denuncia.idDenuncia}</span></p>
                            <p class="col-6"><span class="fw-medium fs-5">Fecha:</span> <span class="fs-5">${denuncia.fechaDenuncia + " " + denuncia.horaDenuncia }</span></p>
                            <p class="col-12"><span class="fw-medium fs-5">Tipo:</span> <span class="fs-5">${denuncia.tipoDenuncia}</span></p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <h3 class="fw-bold">Datos del hecho</h3>
                        <div class="card p-4">
    
                            ${ denuncia.certezaFecha? 
                                `<p><span class="fw-bold">Fecha y Hora del Hecho:</span> <span class="">${denuncia.fechaHecho + " " + denuncia.horaHecho}</span></p>`:
                                `<p><span class="fw-bold">Detalle de la fecha del hecho:</span> <span class="">${denuncia.detalleFecha}</span></p>` }
                                
                            <p><span class="fw-bold">Localidad:</span> <span class="">${denuncia.localidad}</span></p>
                            ${ denuncia.certezaLugar? 
                                `<p><span class="fw-bold">Barrio: </span> <span class="">${denuncia.barrio}</span></p>
                                <p><span class="fw-bold">Calle: </span> <span class="">${denuncia.calleHecho}</span></p>
                                <p><span class="fw-bold">Numero de Calle: </span> <span class="">${denuncia.numCalle}</span></p>
                                
                                <p><span class="fw-bold">Departamento: </span> <span class="">${denuncia.departamentoHecho? denuncia.departamentoHecho : "Sin Especificar" }</span></p>
                                <p><span class="fw-bold">Piso: </span> <span class="">${denuncia.pisoHecho? denuncia.pisoHecho : "Sin Especificar" }</span></p>`:`
                                <p><span class="fw-bold">Detalle del lugar del hecho:</span> <span class="">${denuncia.detalleLugar}</span></p>` }
                        </div>
                    </div>
                </div>
                <div class="p-3" id="item2">
                    <p class="fw-bold fs-4">Que paso:</p>
                    <p class="text-wrap">${denuncia.descripcionQue? denuncia.descripcionQue:'Sin especificar'}</p>
                </div>
                <div class="p-3" id="item3">
                    <p class="fw-bold fs-4">Como paso:</p>
                    <p class="text-wrap">${denuncia.descripcionComo? denuncia.descripcionComo:'Sin especificar'}</p>
                </div>
    
                ${
                    (
                        () => {
                            switch(denuncia.tipoDenuncia){
                                case "Violencia de Género":
                                    var situaciones = {
                                        situacion1: "Separacion reciente o en trámite de separación.",
                                        situacion2: "Acoso reciente a la victima o quegrante de la orden de alejamiento."
                                    };
                                    var tiposViolencia = {
                                        tipoViolencia1:"Existenvia de violencia físia susceptible de causar lesiones.",
                                        tipoViolencia2:"Violencia física en presencia de los hijos u otros familiares.",
                                        tipoViolencia3:"Aumento de la frecuencia y de la gravedad de los incidentes violentos en el último mes",
                                        tipoViolencia4:"Amenazas graves o de muerte en el último mes.",
                                        tipoViolencia5:"Amenazas con objetos peligrosos o con armas de cualquier tipo.",
                                        tipoViolencia6:"Inencion clara de causar lesiones graves o muy graves.",
                                        tipoViolencia7:"Agresiones sexuales en la relacion de pareja."
                                    }
                                    var perfilesAgresores = {
                                        perfilAgresor1:"Celos muy intensos o conductas controladoras sobre la pareja.",
                                        perfilAgresor2:"Historial de conductas violentas con una pareja anterior.",
                                        perfilAgresor3:"Historial de consuctas violentas con otras personas (amigos, companeros de trabajo, etc.).",
                                        perfilAgresor4:"Consumo abusivo de alcohol y/o drogas.",
                                        perfilAgresor5:"Antecedentes de enfermedad mentak con abandono de tratamientos psiquiátricos o psicológicos.",
                                        perfilAgresor6:"Conductas de crueldad, de desprecio a la victima y de falta de arrepentimiento.",
                                        perfilAgresor7:"Justificacion de las conductas violentas por su propio estado (alcohol, drogas, estrés) o por la provicacion de la victima."
                                    }
                                    var vulnerabilidades = {
                                        vulnerabilidades1:"Percepción de la victima de peligro de muerte en el último mes.",
                                        vulnerabilidades2:"Intentos de retirar denuncias previas o de echarse atras en la decision de abandonar o denunciar al agresor.",
                                        vulnerabilidades3:"Vulnerabilidad de la victima por razones de enfermedad, soledad o dependencia.",
                                        vulnerabilidades4:"Depende económicamente la victima del agresor."
                                    }
                                    return `
                                        <div class="p-4" id="item4">
                                            <div class="mb-3">
                                                <h3 class="fw-bold">Formulario de Violencia de Género</h3>
                                                <div class="card  p-4">
                                                    <div class="row">
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Situaciones</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(situaciones)
                                                                    .filter(sit => denuncia[sit] !== undefined && denuncia[sit] !== 0)
                                                                    .map(sit => `<li class="list-group-item">${situaciones[sit]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Tipo Violencia</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(tiposViolencia)
                                                                    .filter(vio => denuncia[vio] !== undefined && denuncia[vio] !== 0)
                                                                    .map(vio => `<li class="list-group-item">${tiposViolencia[vio]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Perfil Agresor</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(perfilesAgresores)
                                                                    .filter(perfAgresor => denuncia[perfAgresor] !== undefined && denuncia[perfAgresor] !== 0)
                                                                    .map(perfAgresor => `<li class="list-group-item">${perfilesAgresores[perfAgresor]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Vulnerabilidades</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(vulnerabilidades)
                                                                    .filter(vul => denuncia[vul] !== undefined && denuncia[vul] !== 0)
                                                                    .map(vul => `<li class="list-group-item">${vulnerabilidades[vul]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                case "Violencia Intrafamiliar":
                                    var situaciones = {
                                        situacion1:"¿La víctima convive con el agresor?",
                                        situacion2:"¿Hubieron medidas de restriccion previas o denuncias contra el agresor?",
                                        situacion3:"¿El agresor posee titulo de propiedad de la vivienda en la que vive la víctima?",
                                        situacion4:"¿La víctima vive en situacion de hacinamiento?"
                                    };
                                    var tiposViolencia = {
                                        tipoViolencia1:"Existió o existe violencia física susceptible de causar lecinoes.",
                                        tipoViolencia2:"Aumentó la frecuencia y/o la gravedad de los incidentes violentos en el último mes.",
                                        tipoViolencia3:"Hay o hubieron amenazas graves o de muerte en el último mes.",
                                        tipoViolencia4:"Hay o hubieron amenazas con objetos peligrosos o con armas de cualquier tipo.",
                                        tipoViolencia5:"Se produjeron daños/vandalismos a objetos o a la propiedad.",
                                        tipoViolencia6:"Se produjeron daños o amenazas de daño a la mascotas."
                                    }
                                    var perfilesAgresores = {
                                        perfilAgresor1:"Tiene o tuvo consuctas violentas con otras personas (amigos, vecinos, companeros de trabajo, pareja, etc.).",
                                        perfilAgresor2:"Consumo abusivo de alcohol.",
                                        perfilAgresor3:"Consumo abusivo de droga.",
                                        perfilAgresor4:"Tiene antecedentes de enfermedad mental.",
                                        perfilAgresor5:"Esta o estuvo en tratamiento psicológico/psiquiatra.",
                                        perfilAgresor6:"Posee antecedentes de intentos de suicidio."
                                    }
                                    var victimas = {
                                        victima1:"Niño / Adolescente.",
                                        victima2:"Tercera edad.",
                                        victima3:"Mujer.",
                                        victima4:"Hombre.",
                                        victima5:"Persona que pertenece a la comunidad LGTBIQ+.",
                                        victima6:"Persona en condicion de discapacidad.",
                                        victima7:"Persona gestante."
                                    }
                                    var caracteristicas = {
                                        caracteristicas1:"Tiene alguna enfermedad mental.",
                                        caracteristicas2:"Presenta patologías físicas crónicas o agudas.",
                                        caracteristicas3:"Esta o estuvo en tratamiento psicológico o psiquiátrico.",
                                        caracteristicas4:"Posee vulnerabilidad habitacional/falta de acceso a vivienda.",
                                        caracteristicas5:"Posee alguna vulnerabilidad económica/laboral.",
                                        caracteristicas6:"Forma parte de un grupo social/familiar de apoyo."
                                    }
                                    return `
                                        <div class="p-4" id="item5">
                                            <div class="mb-3">
                                                <h3 class="fw-bold">Formulario de Violencia Intrafamiliar</h3>
                                                <div class="card p-4">
                                                    <div class="row justify-content-center">
                                                        <div class=" p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Situaciones</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(situaciones)
                                                                    .filter(sit => denuncia[sit] !== undefined)
                                                                    .map(sit => `<li class="list-group-item">${situaciones[sit]}: ${(denuncia[sit])?`SI`:`NO`}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Tipo Violencia</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(tiposViolencia)
                                                                    .filter(vio => denuncia[vio] !== undefined && denuncia[vio] !== 0)
                                                                    .map(vio => `<li class="list-group-item">${tiposViolencia[vio]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Perfil Agresor</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(perfilesAgresores)
                                                                    .filter(perfAgresor => denuncia[perfAgresor] !== undefined && denuncia[perfAgresor] !== 0)
                                                                    .map(perfAgresor => `<li class="list-group-item">${perfilesAgresores[perfAgresor]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Victima</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(victimas)
                                                                    .filter(vic => denuncia[vic] !== undefined && denuncia[vic] !== 0)
                                                                    .map(vic => `<li class="list-group-item">${victimas[vic]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-8" id="list-violencia">
                                                            <h5 class="fw-bold">Caracteristicas</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(caracteristicas)
                                                                    .filter(car => denuncia[car] !== undefined && denuncia[car] !== 0)
                                                                    .map(car => `<li class="list-group-item">${caracteristicas[car]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                case "Robo / Hurto":
                                
                                    var situaciones = {
                                        danoCosas: "se dañaron las propiedades de la victima",
                                        armas: "se emplearon armas durante el hecho",
                                        violenciaFisica:"se ejercio violencia fisica durante el hecho",
                                        amenaza: "se produjeron amenazas durante el hecho",
                                        arrebato: "se produjo un arrebato durante el hecho",
                                        otra: "se produjo una circunstancia de caracter complejo durante el hecho"
                                    }
    
                                    return `
                                        <div class="p-4" id="item6">
                                            <div class="mb-3">
                                                <h3 class="fw-bold">Formulario de Robo y Hurto</h3>
                                                <div class="card p-4">
                                                    <div class="row justify-content-center">
                                                        
                                                        <!--tabla principal-->
                                                        <div class="px-3 pb-4">
                                                            <h5 class="fw-bold">Situaciones</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(situaciones)
                                                                    .filter(sit => denuncia[sit] !== undefined && denuncia[sit] !== 0)
                                                                    .map(sit => `<li class="list-group-item">${situaciones[sit]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        
                                                        <div class="px-3 pb-4">
                                                            <h5 class="fw-bold">Propiedades</h5>
                                                            <!--tablas secundarias-->
                                                            <div class="row justify-content-around">
                                                                ${ denuncia.cantTelefonos !== undefined && denuncia.cantTelefonos !== 0? `
                                                                    <div class="px-3 py-2 m-0 col-12" id="list-robo-telefonos">
                                                                        <h6 class="fw-bold">Telefonos</h6>
                                                                        <table class="table table-striped table-sm px-2">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Número</th>
                                                                                    <th>Empresa</th>
                                                                                    <th>IMEI</th>
                                                                                    <th>Marca</th>
                                                                                    <th>Modelo</th>
                                                                                    <th>Observaciones</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            ${
                                                                                denuncia.propiedades.telefonos
                                                                                .map(tel => `
                                                                                    <tr>
                                                                                        <td class="col text-wrap">${ tel.numero }</td>
                                                                                        <td class="col text-wrap">${ tel.empresa }</td>
                                                                                        <td class="col text-wrap">${ tel.imei }</td>
                                                                                        <td class="col text-wrap">${ tel.idDenunciaCelularesMarca }</td>
                                                                                        <td class="col text-wrap">${ tel.modelo }</td>
                                                                                        <td class="col text-wrap">${ (tel.observaciones =="")?`Sin Especificar`:tel.observaciones}</td>
                                                                                    </tr>
                                                                                `)
                                                                                .join("")
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                `:`` }
            
                                                                ${ denuncia.cantAutomoviles !== undefined && denuncia.cantAutomoviles !== 0? `
                                                                    <div class="px-3 py-2 m-0 col-12" id="list-robo-automoviles">
                                                                        <h6 class="fw-bold">Automoviles</h6>
                                                                        
                                                                        <table class="table table-striped table-sm px-2">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Dominio</th>
                                                                                    <th>Modelo</th>
                                                                                    <th>Titular</th>
                                                                                    <th>GNC</th>
                                                                                    <th>Observaciones</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            ${
                                                                                denuncia.propiedades.automoviles
                                                                                .map(auto => `
                                                                                    <tr>
                                                                                        <td class="col text-wrap">${auto.dominio}</td>
                                                                                        <td class="col text-wrap">${auto.modelo}</td>
                                                                                        <td class="col text-wrap">${auto.titular}</td>
                                                                                        <td class="col text-wrap">${ (auto.cng)?`SI`:`NO`}</td>
                                                                                        <td class="col text-wrap">${ (auto.observaciones=="")?`Sin Especificar`:auto.observaciones}</td>
                                                                                    </tr>
                                                                                `)
                                                                                .join("")
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                `:`` }
            
                                                                ${ denuncia.cantAutopartes !== undefined && denuncia.cantAutopartes !== 0? `
                                                                    <div class="px-3 py-2 m-0 col-12" id="list-robo-autopartes">
                                                                        <h6 class="fw-bold">Autopartes</h6>
                                                                        <table class="table table-striped table-sm px-2">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Tipo</th>
                                                                                    <th>Marca</th>
                                                                                    <th>Modelo</th>
                                                                                    <th>Observaciones</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            ${
                                                                                denuncia.propiedades.autopartes
                                                                                .map(part => `
                                                                                    <tr>
                                                                                        <td class="col text-wrap">${part.tipo}</td>
                                                                                        <td class="col text-wrap">${part.marca}</td>
                                                                                        <td class="col text-wrap">${part.modelo}</td>
                                                                                        <td class="col text-wrap">${ (part.observaciones=="")?`Sin Especificar`:part.observaciones}</td>
                                                                                    </tr>
                                                                                `)
                                                                                .join("")
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                `:`` }
            
                                                                ${ denuncia.cantBicicletas !== undefined && denuncia.cantBicicletas !== 0? `
                                                                    <div class="px-3 py-2 m-0 col-12" id="list-robo-bicicletas">
                                                                        <h6 class="fw-bold">Bicicletas</h6>
                                                                        <table class="table table-striped table-sm px-2">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Nro. de Serie</th>
                                                                                    <th>Marca</th>
                                                                                    <th>Rodado</th>
                                                                                    <th>Observaciones</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            ${
                                                                                denuncia.propiedades.bicicletas
                                                                                .map(bici => `
                                                                                    <tr>
                                                                                        <td class="col text-wrap">${bici.numSerie}</td>
                                                                                        <td class="col text-wrap">${bici.marca}</td>
                                                                                        <td class="col text-wrap">${bici.rodado}</td>
                                                                                        <td class="col text-wrap">${ (bici.observaciones=="")?`Sin Especificar`:bici.observaciones}</td>
                                                                                    </tr>
                                                                                `)
                                                                                .join("")
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                `:`` }
            
                                                                ${ denuncia.cantCheques !== undefined && denuncia.cantCheques !== 0? `
                                                                    <div class="px-3 py-2 m-0 col-12" id="list-robo-cheques">
                                                                        <h6 class="fw-bold">Cheques</h6>
                                                                        <table class="table table-striped table-sm px-2">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Tipo</th>
                                                                                    <th>Banco</th>
                                                                                    <th>Titular</th>
                                                                                    <th>Observaciones</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            ${
                                                                                denuncia.propiedades.cheques
                                                                                .map(cheq => `
                                                                                    <tr>
                                                                                        <td class="col text-wrap">${cheq.tipo}</td>
                                                                                        <td class="col text-wrap">${cheq.banco}</td>
                                                                                        <td class="col text-wrap">${cheq.titularCuenta}</td>
                                                                                        <td class="col text-wrap">${ (cheq.observaciones=="")?`Sin Especificar`:cheq.observaciones}</td>
                                                                                    </tr>
                                                                                `)
                                                                                .join("")
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                `:`` }
            
                                                                ${ denuncia.cantDocumentacion !== undefined && denuncia.cantDocumentacion !== 0? `
                                                                    <div class="px-3 py-2 m-0 col-12" id="list-robo-documentacion">
                                                                        <h6 class="fw-bold">Documentacion</h6>
                                                                        <table class="table table-striped table-sm px-2">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Tipo</th>
                                                                                    <th>Número</th>
                                                                                    <th>Observaciones</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            ${
                                                                                denuncia.propiedades.documentacion
                                                                                .map(doc => `
                                                                                    <tr>
                                                                                        <td class="col text-wrap">${doc.tipo}</td>
                                                                                        <td class="col text-wrap">${doc.numero}</td>
                                                                                        <td class="col text-wrap">${ (doc.observaciones=="")?`Sin Especificar`:doc.observaciones}</td>
                                                                                    </tr>
                                                                                `)
                                                                                .join("")
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                `:`` }
                                                                
                                                                ${ denuncia.cantTarjetas !== undefined && denuncia.cantTarjetas !== 0? `
                                                                    <div class="px-3 py-2 m-0 col-12" id="list-robo-tarjetas">
                                                                        <h6 class="fw-bold">Tarjetas</h6>
                                                                        <table class="table table-striped table-sm px-2">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Tipo</th>
                                                                                    <th>Banco</th>
                                                                                    <th>Número</th>
                                                                                    <th>Observaciones</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            ${
                                                                                denuncia.propiedades.tarjetas
                                                                                .map(tar => `
                                                                                    <tr>
                                                                                        <td class="col text-wrap">${tar.tipo}</td>
                                                                                        <td class="col text-wrap">${tar.banco}</td>
                                                                                        <td class="col text-wrap">${tar.numero}</td>
                                                                                        <td class="col text-wrap">${ (tar.observaciones=="")?`Sin Especificar`:tar.observaciones}</td>
                                                                                    </tr>
                                                                                `)
                                                                                .join("")
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                `:`` }
            
                                                                ${ denuncia.cantOtros !== undefined && denuncia.cantOtros !== 0? `
                                                                    <div class="px-3 py-2 m-0 col-12" id="list-robo-otro">
                                                                        <h6 class="fw-bold">Otro</h6>
                                                                        <table class="table table-striped table-sm px-2">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Tipo</th>
                                                                                    <th>Observaciones</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            ${
                                                                                denuncia.propiedades.otros
                                                                                .map(otros => `
                                                                                    <tr>
                                                                                        <td class="col text-wrap">${otros.tipo}</td>
                                                                                        <td class="col text-wrap">${ (otros.observaciones=="")?`Sin Especificar`:otros.observaciones}</td>
                                                                                    </tr>
                                                                                `)
                                                                                .join("")
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                `:`` }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                case "Delitos Sexuales":
                                    var hechos = {
                                        hechoAcercamiento: "Se produjo un acercamiento.",
                                        hechoContactoTecnologico: "Se produjo un hecho de contacto tecnologico.",
                                        hechoBeso: "Se produjo un beso.",
                                        hechoTocamiento: "Se produjo un hecho de tocamiento.",
                                        hechoIntroduccion: "Se produjo un hecho de introduccion de objeto o parte corporal.",
                                    }; 
                                    var acciones = {
                                        accionViolencia: "El autor empleó violencia o amenazas.",
                                        accionDrogas: "El autor utilizó Drogas.",
                                        accionVulnerabilidad: "El autor se aprovechó de una situación de vulnerabilidad.",
                                        accionArma: "El autor utilizó un arma.",
                                    }; 
                                    var situaciones = {
                                        denunciasPrevias: "Se han realizado denuncias previas.",
                                        solicitudImagenes: "El autor solicitó imagenes con contenido sexual.",
                                        menorInvolucrado: "Hay un menor Involucrado.",
                                        mediosElectronicos: "El/los autor/es enviaron a la vitima imagenes con contenido sexual por medios electronicos.",
                                    };
    
                                    return `
                                    <div class="p-4" id="item7">
                                        <div class="mb-3">
                                            <h3 class="fw-bold">Formulario de Delitos Sexuales</h3>
                                            <div class="card  p-4">
                                                <div class="row">
                                                    <div class="p-3 m-0 col-6" id="list-delitos-sexuales">
                                                        <p><span class="fw-bold">Hechos</span></p>
                                                        <ul class="list-group">
                                                            ${
                                                                Object.keys(hechos)
                                                                .filter(hec => denuncia[hec] !== undefined && denuncia[hec] !== 0)
                                                                .map(hec => `<li class="list-group-item">${hechos[hec]}</li>`)
                                                                .join("")
                                                            }
                                                        </ul>
                                                    </div>
                                                    <div class="p-3 m-0 col-6" id="list-delitos-sexuales">
                                                        <p><span class="fw-bold">Acciones</span></p>
                                                        <ul class="list-group">
                                                            ${
                                                                Object.keys(acciones)
                                                                .filter(acc => denuncia[acc] !== undefined && denuncia[acc] !== 0)
                                                                .map(acc => `<li class="list-group-item">${acciones[acc]}</li>`)
                                                                .join("")
                                                            }
                                                        </ul>
                                                    </div>
                                                    <div class="p-3 m-0 col-6" id="list-delitos-sexuales">
                                                        <p><span class="fw-bold">Situaciones</span></p>
                                                        <ul class="list-group">
                                                            ${
                                                                Object.keys(situaciones)
                                                                .filter(sit=> denuncia[sit] !== undefined && denuncia[sit] !== 0)
                                                                .map(sit => `<li class="list-group-item">${situaciones[sit]}</li>`)
                                                                .join("")
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `
                                default: return ``
                            }
                        }
                    )()
                }
                
                <div class="p-3" id="item8">
                    <!-- Denunciantes -->
                    <div class="d-grid d-flex flex-column">
                        <div class="mb-4" id="datosDenunciate">
                            ${denuncia.anonimo? 
                            `<h3 class="fw-bold">EL DENUNCIANTE ES ANONIMO</h3>`:
                            `<h3 class="fw-bold">Datos del/los denunciante/s</h3>
                                ${
                                    denunciantes.map((den, index) => `
                                        <div class="row mx-1 justify-content-center" id="den">
                                            <div class="col-6">
                                                <div class="card p-3 mb-3 d-flex flex-wrap">
                                                    <p><span class="fw-bold">Tipo Persona:</span> <span class="">${den.tipoPersona}</span></p>
                                                    
                                                    <p><span class="fw-bold">Apellido:</span> <span class="">${den.apellido}</span></p>
                                                    <p><span class="fw-bold">Nombre:</span> <span class="">${den.nombre}</span></p>
                                                    <p><span class="fw-bold">Alias:</span> <span class="">${den.alias? den.alias: "Sin Especificar"}</span></p>
                                                    <p><span class="fw-bold">Tipo Documento:</span> <span class="">${den.tipoIdentificacion}</span></p>
                                                    <p><span class="fw-bold">Número Documento:</span> <span class="">${den.numeroIdentificacion}</span></p>
                                                    <p><span class="fw-bold">Género:</span> <span class="">${den.identidadAutopercibida}</span></p>
    
                                                    <p><span class="fw-bold">Fecha de Nacimiento:</span> <span class="">${den.fechaNacimiento}</span></p>
                                                    <p><span class="fw-bold">Nacionalidad:</span> <span class="">${den.nacionalidad}</span></p>
                                                    <p><span class="fw-bold">Domicilio:</span> <span class="">${den.domicilio}</span></p>
    
                                                    <p><span class="fw-bold">Provincia:</span> <span class="">${den.provincia? den.provincia : "Sin Especificar"}</span></p>
                                                    <p><span class="fw-bold">Barrio:</span> <span class="">${den.barrio? den.barrio : "Sin Especificar"}</span></p>
                                                    <p><span class="fw-bold">Localidad:</span> <span class="">${den.localidad? den.localidad : "Sin Especificar"}</span></p>
    
                                                    <p><span class="fw-bold">Teléfono Móvil:</span> <span class="">${den.telefonoMovil? den.telefonoMovil : "Sin Especificar"}</span></p>
                                                    <p><span class="fw-bold">Teléfono Fijo:</span> <span class="">${den.telefonoFijo? den.telefonoFijo : "Sin Especificar"}</span></p>
                                                    <p><span class="fw-bold">Correo Electrónico:</span> <span class="">${den.email}</span></p>
    
                                                    ${victimasRelaciones[index] && victimasRelaciones[index].conocimientoVictima !== 0? 
                                                        `
                                                            <p><span class="fw-bold">Vinculo con la victima:</span> <span class="">${victimasRelaciones[index].vinculoVictima !== "Otro"? victimasRelaciones[index].vinculoVictima : victimasRelaciones[index].detalleVinculo }</span></p>
                                                        `:`
                                                            <p><span class="fw-bold">No conoce a la victima</span></p>
                                                        `
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')
                                }
                            </div>`}
                    </div>
                </div>
    
                <div class="p-3" id="item9">
                    <!-- Victimas -->
                    <h3 class="fw-bold">Datos de los involucrados</h3>
                    ${victimas.length !== 0?
                        `
                            <h5 class="fw-bold">Datos de la/s Víctima/s</h5>
                            <div class="row mx-1 justify-content-center">
                                ${ 
                                    victimas.map((victima, index) => `
                                    <div class="col-6">
                                        <div class="card p-3 mb-3 d-flex flex-wrap">
                                            <p><span class="fw-bold">Tipo Persona:</span> <span class="">${victima.tipoPersona}</span></p>
                                                            
                                            <p><span class="fw-bold">Apellido:</span> <span class="">${victima.apellido}</span></p>
                                            <p><span class="fw-bold">Nombre:</span> <span class="">${victima.nombre}</span></p>
                                            <p><span class="fw-bold">Alias:</span> <span class="">${victima.alias? victima.alias: "Sin Especificar"}</span></p>
                                            <p><span class="fw-bold">Tipo Documento:</span> <span class="">${victima.tipoIdentificacion}</span></p>
                                            <p><span class="fw-bold">Número Documento:</span> <span class="">${victima.numeroIdentificacion}</span></p>
                                            <p><span class="fw-bold">Género:</span> <span class="">${victima.identidadAutopercibida}</span></p>
    
                                            <p><span class="fw-bold">Fecha de Nacimiento:</span> <span class="">${victima.fechaNacimiento}</span></p>
                                            <p><span class="fw-bold">Nacionalidad:</span> <span class="">${victima.nacionalidad}</span></p>
                                            <p><span class="fw-bold">Domicilio:</span> <span class="">${victima.domicilio}</span></p>
    
                                            <p><span class="fw-bold">Provincia:</span> <span class="">${victima.provincia? victima.provincia : "Sin Especificar"}</span></p>
                                            <p><span class="fw-bold">Barrio:</span> <span class="">${victima.barrio? victima.barrio : "Sin Especificar"}</span></p>
                                            <p><span class="fw-bold">Localidad:</span> <span class="">${victima.localidad? victima.localidad : "Sin Especificar"}</span></p>
    
                                            <p><span class="fw-bold">Teléfono Móvil:</span> <span class="">${victima.telefonoMovil? victima.telefonoMovil : "Sin Especificar"}</span></p>
                                            <p><span class="fw-bold">Teléfono Fijo:</span> <span class="">${victima.telefonoFijo? victima.telefonoFijo : "Sin Especificar"}</span></p>
                                            <p><span class="fw-bold">Correo Electrónico:</span> <span class="">${victima.email}</span></p>
                                        </div>
                                    </div>
                                    `).join('')
                                }
                            </div>
                        `:``
                    }
                    
                </div>
    
                <div class="p-3" id="item10">
                    <!-- Denunciados -->
                    ${  denuncia.datosDenunciado? 
                        `<h5 class="fw-bold">Datos de la/s Denunciado/s</h5>
                        <div class="row mx-1 justify-content-center">
                        ${
                            denunciados.map(denunciado => `
                                <div class="col-6">
                                    <div class="card p-3 mb-3 d-flex flex-wrap">
                                        <p><span class="fw-bold">Tipo Persona:</span> <span class="">${denunciado.tipoPersona? denunciado.tipoPersona : "Sin Especificar"}</span></p>
                                                        
                                        <p><span class="fw-bold">Apellido:</span> <span class="">${denunciado.apellido? denunciado.apellido: "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Nombre:</span> <span class="">${denunciado.nombre? denunciado.nombre: "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Alias:</span> <span class="">${denunciado.alias? denunciado.alias: "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Tipo Documento:</span> <span class="">${denunciado.tipoIdentificacion? denunciado.tipoIdentificacion : "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Número Documento:</span> <span class="">${denunciado.numeroIdentificacion? denunciado.numeroIdentificacion : "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Género:</span> <span class="">${denunciado.identidadAutopercibida? denunciado.identidadAutopercibida : "Sin Especificar"}</span></p>
    
                                        <p><span class="fw-bold">Fecha de Nacimiento:</span> <span class="">${denunciado.fechaNacimiento? denunciado.fechaNacimiento: "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Nacionalidad:</span> <span class="">${denunciado.nacionalidad? denunciado.nacionalidad: "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Domicilio:</span> <span class="">${denunciado.domicilio? denunciado.domicilio: "Sin Especificar"}</span></p>
    
                                        <p><span class="fw-bold">Provincia:</span> <span class="">${denunciado.provincia? denunciado.provincia : "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Barrio:</span> <span class="">${denunciado.barrio? denunciado.barrio : "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Localidad:</span> <span class="">${denunciado.localidad? denunciado.localidad : "Sin Especificar"}</span></p>
    
                                        <p><span class="fw-bold">Teléfono Móvil:</span> <span class="">${denunciado.telefonoMovil? denunciado.telefonoMovil : "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Teléfono Fijo:</span> <span class="">${denunciado.telefonoFijo? denunciado.telefonoFijo : "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Correo Electrónico:</span> <span class="">${denunciado.email? denunciado.email: "Sin Especificar"}</span></p>
                                        
                                        <p><span class="fw-bold">Informacion Adicional:</span> <span class="">${denunciado.informacionAdicional? denunciado.informacionAdicional: "Sin Especificar" }</span></p>
                                    </div>
                                </div>
                            `).join('') 
                        }
                        </div>`:
                        `<h5 class="fw-bold">El/Los Denunciado/s no fueron reconocidos</h5>
                        ${
                            denunciados.map(denunciado => `
                                <div class="col-12 card p-3">
                                    <p><span class="fw-bold">Informacion Adicional:</span> <span class="">${denunciado.informacionAdicional? denunciado.informacionAdicional: "Sin Especificar" }</span></p>
                                </div>
                            `).join('')
                        }`
    
                    }
                    
                </div>
    
                <div class="p-3" id="item11">
                    <!-- Testigos -->
                    ${denuncia.testigo?
                        (denuncia.datosTestigo?
                        `<h5 class="fw-bold">Datos del/los Testigo/s</h5>
                        <div class="row mx-1 justify-content-around">
                            ${testigos.map(testigo =>  `
                                <div class="col-6">
                                    <div class="card p-3 mb-3 d-flex flex-wrap">
                                        <p><span class="fw-bold">Tipo Persona:</span> <span class="">${testigo.tipoPersona? testigo.tipoPersona : "Sin Especificar"}</span></p>
                                                        
                                        <p><span class="fw-bold">Apellido:</span> <span class="">${testigo.apellido? testigo.apellido: "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Nombre:</span> <span class="">${testigo.nombre? testigo.nombre: "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Alias:</span> <span class="">${testigo.alias? testigo.alias: "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Tipo Documento:</span> <span class="">${testigo.tipoIdentificacion? testigo.tipoIdentificacion : "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Número Documento:</span> <span class="">${testigo.numeroIdentificacion? testigo.numeroIdentificacion : "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Género:</span> <span class="">${testigo.identidadAutopercibida? testigo.identidadAutopercibida : "Sin Especificar"}</span></p>
    
                                        <p><span class="fw-bold">Fecha de Nacimiento:</span> <span class="">${testigo.fechaNacimiento? testigo.fechaNacimiento : "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Nacionalidad:</span> <span class="">${testigo.nacionalidad? testigo.nacionalidad: "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Domicilio:</span> <span class="">${testigo.domicilio? testigo.domicilio: "Sin Especificar"}</span></p>
    
                                        <p><span class="fw-bold">Provincia:</span> <span class="">${testigo.provincia? testigo.provincia : "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Barrio:</span> <span class="">${testigo.barrio? testigo.barrio : "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Localidad:</span> <span class="">${testigo.localidad? testigo.localidad : "Sin Especificar"}</span></p>
    
                                        <p><span class="fw-bold">Teléfono Móvil:</span> <span class="">${testigo.telefonoMovil? testigo.telefonoMovil : "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Teléfono Fijo:</span> <span class="">${testigo.telefonoFijo? testigo.telefonoFijo : "Sin Especificar"}</span></p>
                                        <p><span class="fw-bold">Correo Electrónico:</span> <span class="">${testigo.email? testigo.email: "Sin Especificar"}</span></p>
    
                                        <p><span class="fw-bold">Informacion Adicional:</span> <span class="">${testigo.informacionAdicional? testigo.informacionAdicional: "Sin Especificar" }</span></p>
                                    
                                    </div>
                                </div>
                            `).join('')}
                        </div>`:
                        `<h5 class="fw-bold">Los Testigos no fueron reconocidos</h5>
                        ${
                            testigos.map(testigo => `
                                <div class="col-12 card p-3">
                                <p>
                                    <span class="fw-bold">Informacion Adicional:</span> 
                                    <span class="">${testigo.informacionAdicional? testigo.informacionAdicional: "Sin Especificar" }</span>
                                </p>
                                </div>
                            `).join('') 
                        }`
                        
                        ):
                        `<h5 class="fw-bold">No Hubo Testigos del Hecho</h5>`}
    
                    
                </div>
    
                <div class="p-3" id="item12">
                    <h3 class="fw-bold">Adjunto/Evidencias</h3>
                    ${adjuntos && `
                        <div class="row row-cols-1 g-4">
                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Descripción de la Evidencia: </h5>
                                        <p class="card-text">${denuncia.detalleAdjunto? denuncia.detalleAdjunto:"Sin detalles"}.</p>
                                        <p class="fw-medium">Archivos:</p>
                                        <div class="row">
                                            ${adjuntos.map(adj => `
                                                <div class="card col-4"><div class="card-body"><p class="fst-italic m-0">${adj.nombre}</p></div></div>
                                            `).join('')}
                                        </div>
    
                                    </div>
                                </div>
                            </div>
                        </div>`
                    }
                </div>
    
                <div class="p-3" id="item13">
                    <p class="fw-bold fs-4">Informacion Adicional:</p>
                    <p class="text-wrap">${denuncia.informacionAdicional? denuncia.informacionAdicional:'Sin informacion adicional'}</p>
                </div>
    
                <div class="p-4" id="item14">
                    <div class="" style="font-size: xx-small;">
                        <h5 class="text-center fw-bold my-2">Términos y Condiciones</h5>
                        <p class="fw-medium">Por favor, lea atentamente los siguientes términos y condiciones:</p>
                        <ol type="a" class="list-group list-group-numbered">
                            <li class="list-group-item m-0 p-0">Este sistema no tiene como objetivo la comunicación o informe de urgencias o emergencias, en ese caso debe utilizar como vía de contacto la línea telefónica 911 prevista a tal efecto.</li>
                            <li class="list-group-item m-0 p-0">Si ya han informado el hecho por otro canal formal de denuncia, no debe reportarlo nuevamente utilizando este sistema.</li>
                            <li class="list-group-item m-0 p-0">Esta aplicación te acerca la posibilidad de informar hechos delictivos a la justicia y la misma deberá ser ratificada en la delegación fiscal o fiscalía mas próxima a su ubicación dentro de los 5 (cinco) días hábiles, caso contrario el ayudante fiscal o fiscal interviniente podrá archivarla sin más trámite. Consulte las delegaciones fiscales: <a href="https://mpajujuy.gob.ar/listado-delegaciones">Listado de Delegaciones</a> o las fiscalías en el siguiente enlace: <a href="https://mpajujuy.gob.ar/fiscalia/fiscalias-y-unidades-fiscales">Fiscalías y Unidades Fiscales</a>.</li>
                            <li class="list-group-item m-0 p-0">Si hay que darle tratamiento <strong>URGENTE</strong>, por favor dirígete hasta la comisaria, delegación fiscal o fiscalía mas próxima a tu ubicación.</li>
                            <li class="list-group-item m-0 p-0">Para aquellos casos en que se proporcionen datos personales, los mismos deberán poseer la documentación respaldatoria.</li>
                            <li class="list-group-item m-0 p-0">Quien informe delitos lo hará con la responsabilidad que esto amerita y la certeza sobre la ocurrencia del mismo.</li>
                            <li class="list-group-item m-0 p-0">Se adoptarán todas las medidas técnicas de integridad y seguridad de los datos necesarias para garantizar la seguridad y confidencialidad de los datos personales, de modo de evitar su adulteración, pérdida, consulta o tratamiento no autorizado, y que permitan detectar desviaciones, intencionales o no, de información, ya sea que los riesgos provengan de la acción humana o del medio técnico utilizado.</li>
                            <li class="list-group-item m-0 p-0">La información suministrada no se almacena en el dispositivo móvil una vez que es enviada al servidor.</li>
                            <li class="list-group-item m-0 p-0">Si opta por realizar este proceso de forma anónima no aplicarán los puntos 3 y 5 arriba definidos.</li>
                            <li class="list-group-item m-0 p-0">Acepto ser notificado de la denuncia y todo otro acto vinculado u originado a raíz de la misma al correo electrónico y/o vía WhatsApp al número de teléfono proporcionado.</li>
                        </ol>
                        <p class="mt-3"><strong>Falsa Denuncia: </strong> Al realizar una denuncia, Usted debe saber que si la realiza falsamente (es decir, miente en lo que nos está informando), está cometiendo un delito con penas de prisión de dos meses a un año o multa (artículo 245 del Código Penal).</p>
                    </div>
                </div>
    
                <div class="p-4" id="item15">
                    <div class="" style="font-size: xx-small;">
                        <h5 class="text-center fw-bold my-2">ARTÍCULO 40º</h5>
                        <p class="text-wrap m-0 p-0"">La aplicación de un criterio de oportunidad, será notificada a la víctima al domicilio constituido. Si hubiese mudado de domicilio, tendrá la carga de informarlo al fiscal. Las notificaciones que se practiquen en el domicilio constituido tendrán efectos en el proceso. La imposibilidad de dar con el paradero de la víctima no obstará a la aplicación de los criterios de oportunidad. Al momento de radicar la denuncia deberá hacerse conocer a la víctima el presente artículo.</p>
                        <p class="text-wrap m-0 p-0"">De mediar oposición fundada de la víctima dentro del plazo de tres (3) días, las actuaciones serán remitidas al Fiscal General de la Acusación para que la resuelva. Sin perjuicio de lo anterior el Fiscal General de la Acusación, podrá proceder de oficio a la revisión de la razonabilidad y legalidad del archivo, para lo cual resultará obligatoria su comunicación.</p>
                    </div>
                </div>
    
                <div class="p-4" id="item16">
                    <div class="" style="font-size: xx-small;">
                        <h5 class="text-center fw-bold my-2">Articulo 129°. - DERECHOS DE LA VÍCTIMA</h5>
                        <p class="fw-medium">La víctima tendrá los siguientes derechos:</p>
                        <ol type="a" class="list-group list-group-numbered list-group-flush" >
                            <li class="list-group-item m-0 p-0"">A recibir un trato digno y respetuoso y que se hagan mínimas las molestias derivadas del procedimiento.</li>
                            <li class="list-group-item m-0 p-0"">A que se respete su intimidad en la medida que no obstruya la investigación.</li>
                            <li class="list-group-item m-0 p-0"">A requerir medidas de protección para su seguridad, la de sus familiares y la de los testigos que declaren en su interés, a través de los órganos competentes y a ser asistida en forma integral y especializada con el objeto de propender a su recuperación psíquica, física y social.</li>
                            <li class="list-group-item m-0 p-0"">A intervenir en el procedimiento penal y en el juicio como querellante, conforme a lo establecido por este Código.</li>
                            <li class="list-group-item m-0 p-0"">A ser informada del avance y resultados de la investigación y del proceso, salvo razones fundadas en resguardar su eficacia aún cuando no haya intervenido en él.</li>
                            <li class="list-group-item m-0 p-0"">A examinar documentos y actuaciones, a ser informada verbalmente sobre el estado del proceso y la situación del imputado.</li>
                            <li class="list-group-item m-0 p-0"">A aportar información durante la investigación.</li>
                            <li class="list-group-item m-0 p-0"">A ser escuchada antes de cada decisión que implique la extinción o suspensión de la acción penal. </li>
                            <li class="list-group-item m-0 p-0"">A requerir la revisión ante el Fiscal General de la Acusación, de la desestimación o archivo dispuesto por el fiscal, aun cuando no haya intervenido en el procedimiento como querellante.</li>
                            <li class="list-group-item m-0 p-0"">A requerir el inmediato reintegro de los bienes muebles e inmuebles de los que fue ilegítimamente privado y el cese del estado antijurídico producido por el hecho investigado.</li>
                            <li class="list-group-item m-0 p-0"">A reclamar por demora o ineficiencia en la investigación ante el Fiscal General de la Acusación. </li>
                            <li class="list-group-item m-0 p-0"">Cuando fuere menor o incapaz, el órgano judicial podrá autorizar que durante los actos procesales en los cuales intervenga, sea acompañado por ascendiente, tutor o guardador, salvo que existieren intereses contrapuestos, en cuyo caso será acompañado por el representante del Ministerio de Menores o Incapaces. </li>
                            <li class="list-group-item m-0 p-0"">A ser oída en las audiencias en donde se decida sobre la revocación de alguna medida de coerción personal que pese sobre el imputado y en las audiencias donde se decida sobre la posibilidad de que el imputado obtenga un beneficio en la ejecución de pena que importe su soltura anticipada. </li>
                            <li class="list-group-item m-0 p-0"">En los casos de lesiones dolosas entre convivientes y se presuma la reiteración de hechos, el juez de control podrá disponer a pedido de la víctima o del fiscal la exclusión o prohibición de ingreso al hogar del victimario y/o el alojamiento de la víctima en un lugar adecuado.</li>
                        </ol>
                        <p class="mt-3"><strong>Falsa Denuncia: </strong> Al realizar una denuncia, Usted debe saber que si la realiza falsamente (es decir, miente en lo que nos está informando), está cometiendo un delito con penas de prisión de dos meses a un año o multa (artículo 245 del Código Penal).</p>
                    </div>
                </div>
    
            </div>
    
            <!--<script src="./static/js/bootstrap.bundle.min.js"></script>-->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
            <script>
                moverElementos();
                /*
                    function moverElementos() {
                        var contenedorBase = document.getElementById('contenedorBase');
                        var elementos = Array.from(contenedorBase.children);
                        var alturaMaxima = 290;
                        var nroPagina = 1;
                        var alturaActual = 0;
    
                        var contenedor = crearContenedor(nroPagina);
    
                        elementos.forEach(function (elemento) {
                            var alturaElemento = medirAltura(elemento.id);
    
                            // Verifica si el elemento cabe en la página actual
                            if (alturaActual + alturaElemento <= alturaMaxima) {
                                agregarElemento(elemento.id, nroPagina);
                                alturaActual += alturaElemento;
                            } else { // El elemento no cabe en la página actual, crea una nueva página
                                nroPagina++;
                                contenedor = crearContenedor(nroPagina);
                                alturaActual = alturaElemento;
                                agregarElemento(elemento.id, nroPagina);
                            }
                        });
                        contenedorBase.remove();
                    }
                */
    
                function moverElementos() {
                    var contenedorBase = document.getElementById('contenedorBase');
                    var elementos = Array.from(contenedorBase.children);
                    var alturaMaxima = 290;
                    var contenedores = [];
                    var nroPagina = 1;
                    
                    var contenedor = crearContenedor(nroPagina);
                    var alturaActual = 0;
                
                    elementos.forEach(function (elemento) {
                        var alturaElemento = medirAltura(elemento.id);
                    
                        if (alturaActual + alturaElemento > alturaMaxima) { // Si el elemento no cabe en el contenedor actual, crea uno nuevo
                            //agregarElemento(elemento.id, nroPagina);
                            nroPagina++;
                            contenedor = crearContenedor(nroPagina);
                            alturaActual = 0;
                        }
                    
                        // Verifica si el elemento ocupa más de un contenedor
                        if (alturaElemento > alturaMaxima) { // Si el elemento es demasiado grande, divídelo en varios contenedores
                            var partes = Math.ceil(alturaElemento / alturaMaxima);
                            for (var i = 1; i <= partes; i++) {
                            agregarElemento(elemento.id, nroPagina);
                            alturaActual += alturaMaxima;
                            if (alturaActual > alturaMaxima) {
                                nroPagina++;
                                contenedor = crearContenedor(nroPagina);
                                alturaActual = 0;
                            }
                            }
                        } else {
                            agregarElemento(elemento.id, nroPagina);
                            alturaActual += alturaElemento;
                        }
                    });
                    contenedorBase.remove();
                }
                
    
                function agregarElemento(idElemento, nroPagina){
                    var contenedor = document.getElementById('contenedor'+nroPagina);
                    var elemento = document.getElementById(idElemento);
                    contenedor.appendChild(elemento);
                }
    
                function crearContenedor(id){
                    var nuevo = document.createElement('div');
                    nuevo.classList.add('container-fluid');
                    nuevo.classList.add('hojaA4');
                    nuevo.id = 'contenedor'+id;
                    document.body.appendChild(nuevo);
                    return nuevo;
                }
    
                function medirAltura(elementID) {
                    var elemento = document.getElementById(elementID);
                    
                    if (elemento) {
                        // Obtén la altura en píxeles del elemento
                        var alturaEnPixeles = elemento.clientHeight;
                    
                        // Obtén el tamaño de fuente en píxeles
                        var estilo = window.getComputedStyle(elemento);
                        var tamañoFuenteEnPixeles = parseFloat(estilo.fontSize);
                    
                        // Define la relación píxeles/milímetros (ajusta según tus necesidades)
                        var pixelsPerMillimeter = 25.4583/7.5;
                    
                        // Calcula la altura en milímetros
                        var alturaEnMilimetros = alturaEnPixeles / pixelsPerMillimeter;
                    
                        return alturaEnMilimetros;
                    } else {
                        return 0; // Otra acción o manejo de error
                    }
                }
            </script>
        </body>
    </html>
    `
}


// getComprobanteHtml(denuncia,denunciantes,testigos,denunciados,victimas,adjuntos);
module.exports = { getComprobanteHtml }