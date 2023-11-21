const [tiposVehiculos,marcasVehiculos] = require('../data/denunciaIncidentesViales');
const [perfilesAgresoresGenero,situacionesGenero,tiposViolenciaGenero,vulnerabilidadesGenero] = require('../data/denunciaViolenciaGenero');
const [situacionesIntrafamiliar,tiposViolenciaIntrafamiliar,perfilesAgresoresIntrafamiliar,victimasIntrafamiliar,caracteristicasIntrafamiliar] = require('../data/denunciaIntrafamiliar');
const [situacionesRoboHurto, marcasCelulares, tiposBicicletas] = require('../data/denunciaRoboHurto');
const [hechosDelitosSexuales,accionesDelitosSexuales,situacionesDelitosSexuales] = require('../data/denunciaDelitosSexuales');
const especies = require('../data/denunciaAbigeato');
const [danios,consecuenciasDanios] = require('../data/denunciaDanios');

const getComprobanteHtml = ({denuncia,denunciantes,victimasRelaciones,testigos,denunciados,victimas,adjuntos,usuario}) => {

    const denunciaTipica = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>

        <body>
            <div id="contenedorBase">
                <div class="px-3" id="item1">
                    <div class="d-flex mb-5 justify-content-center align-items-center">
                        <img src="https://sistema.mpajujuy.gob.ar/images/logompa2.png" alt="Logo MPA" class="img-fluid w-25 h-25">
                    </div>
                    <div class="my-4 d-grid">
                        <div class="ps-3 col d-grid d-flex flex-wrap">
                            <p class="col-6"><span><strong class="fw-bold fs-5">Nro. Denuncia:</strong></span> <span class="fs-5">${denuncia.idDenuncia}</span></p>
                            <p class="col-6"><span><strong class="fw-bold fs-5">Fecha:</strong></span> <span class="fs-5">${denuncia.fechaDenuncia + " " + denuncia.horaDenuncia }</span></p>
                            <p class="col-12"><span><strong class="fw-bold fs-5">Tipo:</strong></span> <span class="fs-5">${denuncia.tipoDenuncia}</span></p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <h3 class="fw-bold">Datos del hecho</h3>
                        <div class="card p-4">
                            ${ denuncia.certezaFecha? 
                                `<p><strong>Fecha y Hora del Hecho:</strong> ${denuncia.fechaHecho + " " + denuncia.horaHecho}</p>`
                                :
                                `<p><strong>Detalle de la fecha del hecho:</strong> ${denuncia.detalleFecha}</p>`
                            }
                                
                            <p><strong>Localidad:</strong> ${denuncia.localidad}</p>
                            ${ denuncia.certezaLugar? 
                                `
                                    <p><strong>Barrio:</strong> ${denuncia.barrio?denuncia.barrio:`Sin Especificar`}</p>
                                    <p><strong>Calle:</strong> ${denuncia.calleHecho?denuncia.calleHecho:`Sin Especificar`}</p>
                                    <p><strong>Numero de Calle:</strong> ${denuncia.numCalle?denuncia.numCalle:`Sin Especificar`}</p>
                                    
                                    <p><strong>Departamento:</strong> ${denuncia.departamentoHecho? denuncia.departamentoHecho : "Sin Especificar" }</p>
                                    <p><strong>Piso:</strong> ${denuncia.pisoHecho? denuncia.pisoHecho : "Sin Especificar" }</p>`
                                :`
                                    <p><strong>Detalle del lugar del hecho:</strong> ${denuncia.detalleLugar}</p>
                                `
                            }
                            <p><strong>Delitos</strong></p>
                            <ul class="list-group">
                                ${denuncia.femicidio? `<li class="list-group-item">Femicidio</li>` : ``}
                                ${denuncia.lesiones? `<li class="list-group-item">Lesiones contra la persona</li>` : ``}
                                ${denuncia.homicidio? `<li class="list-group-item">Homicidio</li>` : ``}
                            </ul>
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
                                    return `
                                        <div class="p-4" id="item4">
                                            <div class="mb-3">
                                                <div class="card border-3 d-flex justify-content-center p-3">
                                                    <h3 class="fw-bold text-center">Formulario de Violencia de Género</h3>
                                                </div>
                                                <div class="card  p-4">
                                                    <div class="row">
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Situaciones</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(situacionesGenero)
                                                                    .filter(sit => denuncia[sit] !== undefined && denuncia[sit] !== 0)
                                                                    .map(sit => `<li class="list-group-item">${situacionesGenero[sit]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Tipo Violencia</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(tiposViolenciaGenero)
                                                                    .filter(vio => denuncia[vio] !== undefined && denuncia[vio] !== 0)
                                                                    .map(vio => `<li class="list-group-item">${tiposViolenciaGenero[vio]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Perfil Agresor</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(perfilesAgresoresGenero)
                                                                    .filter(perfAgresor => denuncia[perfAgresor] !== undefined && denuncia[perfAgresor] !== 0)
                                                                    .map(perfAgresor => `<li class="list-group-item">${perfilesAgresoresGenero[perfAgresor]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Vulnerabilidades</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(vulnerabilidadesGenero)
                                                                    .filter(vul => denuncia[vul] !== undefined && denuncia[vul] !== 0)
                                                                    .map(vul => `<li class="list-group-item">${vulnerabilidadesGenero[vul]}</li>`)
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
                                    return `
                                        <div class="p-4" id="item5">
                                            <div class="mb-3">
                                                <div class="card border-3 d-flex justify-content-center p-3">
                                                    <h3 class="fw-bold text-center">Formulario de Violencia Intrafamiliar</h3>
                                                </div>
                                                <div class="card p-4">
                                                    <div class="row justify-content-center">
                                                        <div class=" p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Situaciones</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(situacionesIntrafamiliar)
                                                                    .filter(sit => denuncia[sit] !== undefined)
                                                                    .map(sit => `<li class="list-group-item">${situacionesIntrafamiliar[sit]}: ${(denuncia[sit])?`SI`:`NO`}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Tipo Violencia</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(tiposViolenciaIntrafamiliar)
                                                                    .filter(vio => denuncia[vio] !== undefined && denuncia[vio] !== 0)
                                                                    .map(vio => `<li class="list-group-item">${tiposViolenciaIntrafamiliar[vio]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Perfil Agresor</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(perfilesAgresoresIntrafamiliar)
                                                                    .filter(perfAgresor => denuncia[perfAgresor] !== undefined && denuncia[perfAgresor] !== 0)
                                                                    .map(perfAgresor => `<li class="list-group-item">${perfilesAgresoresIntrafamiliar[perfAgresor]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-violencia">
                                                            <h5 class="fw-bold">Victima</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(victimasIntrafamiliar)
                                                                    .filter(vic => denuncia[vic] !== undefined && denuncia[vic] !== 0)
                                                                    .map(vic => `<li class="list-group-item">${victimasIntrafamiliar[vic]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-8" id="list-violencia">
                                                            <h5 class="fw-bold">Caracteristicas</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(caracteristicasIntrafamiliar)
                                                                    .filter(car => denuncia[car] !== undefined && denuncia[car] !== 0)
                                                                    .map(car => `<li class="list-group-item">${caracteristicasIntrafamiliar[car]}</li>`)
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
                                    return `
                                        <div class="p-4" id="item6">
                                            <div class="mb-3">
                                                <div class="card border-3 d-flex justify-content-center p-3">
                                                    <h3 class="fw-bold text-center">Formulario de Robo y Hurto</h3>
                                                </div>
                                                <div class="card p-4">
                                                    <div class="row justify-content-center">
                                                        
                                                        <!--tabla principal-->
                                                        <div class="px-3 pb-4">
                                                            <h5 class="fw-bold">Situaciones</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(situacionesRoboHurto)
                                                                    .filter(sit => denuncia[sit] !== undefined && denuncia[sit] !== 0)
                                                                    .map(sit => `<li class="list-group-item">${situacionesRoboHurto[sit]}</li>`)
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
                                                                                        <td class="col text-wrap">${ marcasCelulares[tel.idDenunciaCelularesMarca] }</td>
                                                                                        <td class="col text-wrap">${ tel.modelo }</td>
                                                                                        <td class="col text-wrap">${ (tel.otro =="")?`Sin Especificar`:tel.otro}</td>
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
                                                                                    <th>Marca</th>
                                                                                    <th>Modelo</th>
                                                                                    <th>Tipo</th>
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
                                                                                        <td class="col text-wrap">${marcasVehiculos[auto.marca]}</td>
                                                                                        <td class="col text-wrap">${auto.modelo}</td>
                                                                                        <td class="col text-wrap">${tiposVehiculos[auto.tipo]}</td>
                                                                                        <td class="col text-wrap">${auto.titular}</td>
                                                                                        <td class="col text-wrap">${(auto.cng)?`SI`:`NO`}</td>
                                                                                        <td class="col text-wrap">${(auto.observaciones=="")?`Sin Especificar`:auto.observaciones}</td>
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
                                                                                    <th>Dominio</th>
                                                                                    <th>Sustraido</th>
                                                                                    <th>Dañada</th>
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
                                                                                        <td class="col text-wrap">${part.dominio}</td>
                                                                                        <td class="col text-wrap">${part.sustraido?`SI`:`NO`}</td>
                                                                                        <td class="col text-wrap">${part.danada?`SI`:`NO`}</td>
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
                                                                                    <th>Tipo</th>
                                                                                    <th>Color</th>
                                                                                    <th>Rodado</th>
                                                                                    <th>Seguro</th>
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
                                                                                        <td class="col text-wrap">${tiposBicicletas[bici.idDenunciaBicicletasTipo]}</td>
                                                                                        <td class="col text-wrap">${bici.colorCuadro}</td>
                                                                                        <td class="col text-wrap">${bici.rodado}</td>
                                                                                        <td class="col text-wrap">${bici.seguro?`SI`:`NO`}</td>
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
                                    return `
                                        <div class="p-4" id="item7">
                                            <div class="mb-3">
                                                <div class="card border-3 d-flex justify-content-center p-3">
                                                    <h3 class="fw-bold text-center">Formulario de Delitos Sexuales</h3>
                                                </div>
                                                <div class="card  p-4">
                                                    <div class="row">
                                                        <div class="p-3 m-0 col-6" id="list-delitos-sexuales">
                                                            <h5 class="fw-bold">Hechos</h5>
                                                            <ul class="list-group">
                                                                ${
                                                                    Object.keys(hechosDelitosSexuales)
                                                                    .filter(hec => denuncia[hec] !== undefined && denuncia[hec] !== 0)
                                                                    .map(hec => `<li class="list-group-item">${hechosDelitosSexuales[hec]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-delitos-sexuales">
                                                            <h5 class="fw-bold">Acciones</h5>
                                                            <ul class="list-group">
                                                                ${
                                                                    Object.keys(accionesDelitosSexuales)
                                                                    .filter(acc => denuncia[acc] !== undefined && denuncia[acc] !== 0)
                                                                    .map(acc => `<li class="list-group-item">${accionesDelitosSexuales[acc]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-delitos-sexuales">
                                                            <h5 class="fw-bold">Situaciones</h5>
                                                            <ul class="list-group">
                                                                ${
                                                                    Object.keys(situacionesDelitosSexuales)
                                                                    .filter(sit=> denuncia[sit] !== undefined && denuncia[sit] !== 0)
                                                                    .map(sit => `<li class="list-group-item">${situacionesDelitosSexuales[sit]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                case "Incidentes Viales":
                                    return `
                                        <div class="px-4 pb-4" id="item8">
                                            <h3 class="fw-bold">Vehículos</h3>
                                            <div class="row px-3 justify-content-around">
                                                ${ denuncia.cantVehiculos !== undefined && denuncia.cantVehiculos !== 0? `
                                                    <div class="px-3 py-2 m-0 col-12" id="list-vehiculos-incidentes-viales">
                                                        <table class="table table-bordered table-sm px-2">
                                                            <thead>
                                                                <tr>
                                                                    <th>Dominio</th>
                                                                    <th>Titular</th>
                                                                    <th>Marca</th>
                                                                    <th>Modelo</th>
                                                                    <th>Tipo</th>
                                                                    <th>Color</th>
                                                                    <th>Fabricacion</th>
                                                                    <th>Nro. Notor</th>
                                                                    <th>GNC</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            ${
                                                                denuncia.vehiculosIncidentes
                                                                .map(vehiculo => `
                                                                    <tr>
                                                                        <td class="col text-wrap" rowspan="1">${vehiculo.dominio}</td>
                                                                        <td class="col text-wrap">${vehiculo.titular}</td>
                                                                        <td class="col text-wrap">${marcasVehiculos[vehiculo.idDenunciaAutomovilesMarca]}</td>
                                                                        <td class="col text-wrap">${vehiculo.modelo}</td>
                                                                        <td class="col text-wrap">${tiposVehiculos[vehiculo.idDenunciaAutomovilesTipo]}</td>
                                                                        <td class="col text-wrap">${vehiculo.color}</td>
                                                                        <td class="col text-wrap">${vehiculo.anioFabricacion}</td>
                                                                        <td class="col text-wrap">${vehiculo.numMotor}</td>
                                                                        <td class="col text-wrap">${vehiculo.gnc!=undefined? ( vehiculo.gnc? `SI`:`NO` ) : `Sin Especificar`}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="col text-wrap"><strong>Observaciones: </strong></td>
                                                                        <td class="col text-wrap" colspan="8">${vehiculo.observaciones?vehiculo.observaciones:`Sin Especificar`}</td>
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
                                    `
                                case "Abigeato / Cuatrerismo":
                                    return `
                                        <div class="px-4 pb-4" id="item9">
                                                <div class="card border-3 d-flex justify-content-center p-3">
                                                    <h3 class="fw-bold text-center">Formulario Abigeato / Cuatretismo</h3>
                                                </div>
                                            <div class="card p-3">
                                                <p><strong>Hubo violencia? </strong>${denuncia.violenciaFisica?`SI`:`NO`}</p>
                                                <div class="table-group-divider"></div>
                                                ${ 
                                                    denuncia.avigeatoDetalles !== undefined ? `
                                                        <div class="py-2 m-0 col-12" id="list-animales-abigeato">
                                                            ${
                                                                denuncia.avigeatoDetalles
                                                                .map((animal, index) => `
                                                                    <div class="row flex-wrap">
                                                                        <p class="fs-6 py-1 col-6"><strong>Especie </strong>${especies[animal.idDenunciaAbigeatoDetallesEspecies]}</p>
                                                                        <p class="fs-6 py-1 col-6"><strong>Cantidad </strong>${animal.cantidad}</p>
                                                                        <p class="fs-6 py-1 col-12"><strong>Detalles </strong>${animal.detalle}</p>
                                                                    </div>
                                                                    <div class="table-group-divider"></div>
                                                                `).join('')
                                                            }
                                                        </div>
                                                    `:``
                                                }
                                            </div>
                                        </div>
                                    `
                                case "Maltrato Animal":
                                    return `
                                        <div class="px-4 pb-5" id="item10">
                                                <div class="card border-3 d-flex justify-content-center p-3">
                                                    <h3 class="card-ti text-centertle fw-bold">Formulario de Maltrato Animal</h3>
                                                </div>
                                            <div class="card col-12">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <p class="col-6 card-text"><strong>Tipo de animal:</strong> ${denuncia.tipoAnimal}</p>
                                                        <p class="col-6 card-text"><strong>Condicion del animal:</strong> ${denuncia.condicionAnimal}</p>
                                                        <p class="col-6 card-text"><strong>Atencion de veterinaria:</strong> ${denuncia.atencionVeterinaria}</p>
                                                        <p class="col-6 card-text"><strong>Relacion con el animal:</strong> ${denuncia.relacionAnimal}</p>
                                                        <p class="col-6 card-text"><strong>Como tomó conocimiento?:</strong> ${denuncia.tomoConocimiento}</p>
                                                        <p class="col-6 card-text"><strong>Quien ejercio el acto de violencia? </strong> ${denuncia.violenciaCometida}</p>
                                                        <p class="col-6 card-text"><strong>El animal sufrio abuso sexual?</strong> ${denuncia.abusoAnimal}</p>
                                                        <p class="col-6 card-text"><strong>El acto de violencia lo cometio un funcionario público? </strong> ${denuncia.abusoFuncionario}</p>
                                                        <ul class="list-group mx-3">
                                                            <h6 class="card-text fw-bold">Concivencia:</h6>
                                                            ${denuncia.convivenciaIndeterminado?
                                                                `<li class="list-group-item">No se sabe con quien convivia el animal.</li>`
                                                                :`
                                                                    ${denuncia.convivenciaAdultosMayores?`<li class="list-group-item">El animal convive con Adultos Mayores.</li>`:``}
                                                                    ${denuncia.convivenciaNinos?`<li class="list-group-item">El animal convive con Ninos.</li>`:``}
                                                                    ${denuncia.convivenciaDiscapacidad?`<li class="list-group-item">El animal convive con Personas con Discapacidad.</li>`:``}
                                                                    ${denuncia.convivenciaOtro?`<li class="list-group-item">El animal convive con otro tipo de personas.</li>`:``}
                                                                `
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                case "Daños":
                                    return `
                                        <div class="px-4 mb-4" id="item11">
                                            <div class="mb-3">
                                                <div class="card border-3 d-flex justify-content-center p-3">
                                                    <h3 class="fw-bold text-center">Formulario de Daños</h3>
                                                </div>
                                                <div class="card  p-4">
                                                    <div class="row">
                                                        <div class="p-3 col-12 m-0 d-flex">
                                                            <h5 class="fw-bold">Pertenencia: </h5>
                                                            <p>${denuncia.pertenencia}</p>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-danios">
                                                            <h5 class="fw-bold">Daños</h5>
                                                            <ul class="list-group px-2">
                                                                ${
                                                                    Object.keys(danios)
                                                                    .filter(dan => denuncia[dan] !== undefined && denuncia[dan] !== 0)
                                                                    .map(dan => `<li class="list-group-item">${danios[dan]}</li>`)
                                                                    .join("")
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div class="p-3 m-0 col-6" id="list-consecuencias">
                                                            ${denuncia.consecuenciaDano?
                                                                `
                                                                    <h5 class="fw-bold">Consecuencias</h5>
                                                                    <ul class="list-group px-2">
                                                                        ${denuncia.consecuenciaOtro?
                                                                            `<li class="list-group-item">${denuncia.consecuenciaDetallesOtro}</li>`
                                                                        :`
                                                                            ${
                                                                                Object.keys(consecuenciasDanios)
                                                                                .filter(con => denuncia[con] !== undefined && denuncia[con] !== 0)
                                                                                .map(con => `<li class="list-group-item">${consecuenciasDanios[con]}</li>`)
                                                                                .join("")
                                                                            }
                                                                        `}
                                                                    </ul>
                                                                `:`
                                                                    <h5 class="fw-bold">No se produjo una Consecuencia.</h5>
                                                                `}
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
                
                <div class="p-3" id="item12">
                    <!-- Denunciantes -->
                    <div class="d-grid d-flex flex-column">
                        <div class="px-3 mb-4" id="datos1">
                            ${denuncia.anonimo? 
                            `
                            <div class="card border-3 d-flex justify-content-center p-3">
                                <h4 class="fw-bold text-center">EL DENUNCIANTE ES ANONIMO</h4>
                            </div>
                            `:
                            `<h3 class="fw-bold">Datos del/los denunciante/s</h3>
                                ${
                                    denunciantes.map((den, index) => `
                                        <div class="row mx-1 justify-content-center">
                                            <div class="col-12">
                                                <div class="card my-3 py-1">
                                                    <div class="row">
                                                        <div class="col">
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Tipo Persona:</span> ${den.tipoPersona}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Apellido:</span> ${den.apellido}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Nombre:</span> ${den.nombre}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Alias:</span> ${den.alias? den.alias: "Sin Especificar"}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Nacionalidad:</span> ${den.nacionalidad? den.nacionalidad : `Sin Especificar`}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Identificacion:</span> ${den.tipoIdentificacion} ${den.numeroIdentificacion}</p>
                                                        </div>
                                                        <div class="col">
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Fecha de Nacimiento:</span> ${den.fechaNacimiento}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Género:</span> ${den.identidadAutopercibida? den.identidadAutopercibida : `Sin Especificar`}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Móvil:</span> ${den.telefonoMovil? den.telefonoMovil : "Sin Especificar"}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Fijo:</span> ${den.telefonoFijo? den.telefonoFijo : "Sin Especificar"}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Correo Electrónico:</span> ${den.email}</p>
                                                            ${victimasRelaciones[index] && victimasRelaciones[index].conocimientoVictima !== 0? 
                                                                `
                                                                    <p class="mt-2 ms-3"><span class="fw-bold">Vinculo con la victima:</span> ${victimasRelaciones[index].vinculoVictima !== "Otro"? victimasRelaciones[index].vinculoVictima : victimasRelaciones[index].detalleVinculo }</p>
                                                                `:`
                                                                    <p class="mt-2 ms-3"><span class="fw-bold">No conoce a la victima</span></p>
                                                                `
                                                            }
                                                        </div>
                                                    </div>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Ubicación:</span> 
                                                        ${den.provincia? den.provincia + ", "  : ""} 
                                                        ${den.localidad? (den.barrio? den.localidad + ", ": den.localidad) : ""}
                                                        ${den.barrio? den.barrio + ", " : ""} 
                                                        ${den.domicilio? den.domicilio : ""}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')
                                }
                            </div>`}
                    </div>
                </div>

                <div class="p-3" id="item13">
                    <div class="card border-3 d-flex justify-content-center p-3">
                        <h3 class="px-3 fw-bold text-center">Datos de los involucrados</h3>
                    </div>
                    <!-- Victimas -->
                    
                    ${victimas.length !== 0?
                        `
                        <div class="px-4 mb-4" id="2">
                            <h5 class="fw-bold">Datos de la/s Víctima/s</h5>
                            <div class="row mx-1 justify-content-center">
                                ${ 
                                    victimas.map((victima, index) => `
                                    <div class="col-12">
                                        <div class="card my-3 py-1">
                                            <div class="row">
                                                <div class="col">
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Tipo Persona:</span> ${victima.tipoPersona}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Apellido:</span> ${victima.apellido}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Nombre:</span> ${victima.nombre}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Alias:</span> ${victima.alias? victima.alias: "Sin Especificar"}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Nacionalidad:</span> ${victima.nacionalidad? victima.nacionalidad : `Sin Especificar`}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Identificacion:</span> ${victima.tipoIdentificacion} ${victima.numeroIdentificacion}</p>
                                                </div>
                                                <div class="col">
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Fecha de Nacimiento:</span> ${victima.fechaNacimiento}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Género:</span> ${victima.identidadAutopercibida? victima.identidadAutopercibida : `Sin Especificar`}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Móvil:</span> ${victima.telefonoMovil? victima.telefonoMovil : "Sin Especificar"}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Fijo:</span> ${victima.telefonoFijo? victima.telefonoFijo : "Sin Especificar"}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Correo Electrónico:</span> ${victima.email}</p>
                                                </div>
                                            </div>
                                            <p class="mt-2 ms-3"><span class="fw-bold">Ubicación:</span> 
                                                ${victima.provincia? victima.provincia + ", "  : ""} 
                                                ${victima.localidad? (victima.barrio? victima.localidad + ", ": victima.localidad) : ""}
                                                ${victima.barrio? victima.barrio + ", " : ""} 
                                                ${victima.domicilio? victima.domicilio : ""}
                                            </p>
                                        </div>
                                    </div>
                                    `).join('')
                                }
                            </div>
                        </div>
                        `:``
                    }
                    
                </div>

                <div class="p-3" id="item14">
                    <!-- Denunciados -->
                    ${  denuncia.datosDenunciado? 
                        `
                        <div class="px-4 mb-4" id="datos3">
                            <h5 class="fw-bold">Datos de la/s Denunciado/s</h5>
                            <div class="row mx-1 justify-content-center">
                            ${
                                denunciados.map(denunciado => `
                                    <div class="col-12">
                                        <div class="card my-3 py-1">
                                            <div class="row">
                                                <div class="col">
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Tipo Persona:</span> ${denunciado.tipoPersona}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Apellido:</span> ${denunciado.apellido}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Nombre:</span> ${denunciado.nombre}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Alias:</span> ${denunciado.alias? denunciado.alias: "Sin Especificar"}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Nacionalidad:</span> ${denunciado.nacionalidad? denunciado.nacionalidad : `Sin Especificar`}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Identificacion:</span> ${denunciado.tipoIdentificacion} ${denunciado.numeroIdentificacion}</p>
                                                </div>
                                                <div class="col">
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Fecha de Nacimiento:</span> ${denunciado.fechaNacimiento}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Género:</span> ${denunciado.identidadAutopercibida? denunciado.identidadAutopercibida : `Sin Especificar`}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Móvil:</span> ${denunciado.telefonoMovil? denunciado.telefonoMovil : "Sin Especificar"}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Fijo:</span> ${denunciado.telefonoFijo? denunciado.telefonoFijo : "Sin Especificar"}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Correo Electrónico:</span> ${denunciado.email}</p>
                                                </div>
                                            </div>
                                            <p class="mt-2 ms-3"><span class="fw-bold">Ubicación:</span> 
                                                ${denunciado.provincia? denunciado.provincia + ", "  : ""} 
                                                ${denunciado.localidad? (denunciado.barrio? denunciado.localidad + ", ": denunciado.localidad) : ""}
                                                ${denunciado.barrio? denunciado.barrio + ", " : ""} 
                                                ${denunciado.domicilio? denunciado.domicilio : ""}
                                            </p>
                                            <p class="mt-2 ms-3"><span class="fw-bold">Informacion Adicional:</span> ${denunciado.informacionAdicional? denunciado.informacionAdicional: "Sin Especificar" }</p>
                                        </div>
                                    </div>
                                `).join('') 
                            }
                            </div>
                        </div>
                        `:
                        `
                        <div class="py-3 px-4 mb-4" id="datos3">
                            <div class="card border-3 d-flex justify-content-center p-3">
                                <h5 class="fw-bold text-center">El/Los Denunciado/s no fueron reconocidos</h5>
                            </div>
                            ${
                                denunciados.map(denunciado => `
                                    <div class="col-12 card py-3 px-3">
                                        <p><span class="fw-bold">Informacion Adicional:</span> <span class="">${denunciado.informacionAdicional? denunciado.informacionAdicional: "Sin Especificar" }</span></p>
                                    </div>
                                `).join('')
                            }
                        </div>
                        `
                    }
                </div>

                <div class="p-3" id="item15">
                    <!-- Testigos -->
                    ${denuncia.testigo?
                        (denuncia.datosTestigo?
                            `
                                <div class="px-4 mb-4" id="datos4">
                                    <h5 class="fw-bold">Datos del/los Testigo/s</h5>
                                    <div class="row mx-1 justify-content-around" id="testigos">
                                        ${testigos.map(testigo =>  `
                                            <div class="col-12">
                                                <div class="card my-3 py-1">
                                                    <div class="row">
                                                        <div class="col">
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Tipo Persona:</span> ${testigo.tipoPersona}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Apellido:</span> ${testigo.apellido}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Nombre:</span> ${testigo.nombre}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Alias:</span> ${testigo.alias? testigo.alias: "Sin Especificar"}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Nacionalidad:</span> ${testigo.nacionalidad? testigo.nacionalidad : `Sin Especificar`}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Identificacion:</span> ${testigo.tipoIdentificacion} ${testigo.numeroIdentificacion}</p>
                                                        </div>
                                                        <div class="col">
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Fecha de Nacimiento:</span> ${testigo.fechaNacimiento}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Género:</span> ${testigo.identidadAutopercibida? testigo.identidadAutopercibida : `Sin Especificar`}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Móvil:</span> ${testigo.telefonoMovil? testigo.telefonoMovil : "Sin Especificar"}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Fijo:</span> ${testigo.telefonoFijo? testigo.telefonoFijo : "Sin Especificar"}</p>
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Correo Electrónico:</span> ${testigo.email}</p>
                                                        </div>
                                                    </div>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Ubicación:</span> 
                                                        ${testigo.provincia? testigo.provincia + ", "  : ""} 
                                                        ${testigo.localidad? (testigo.barrio? testigo.localidad + ", ": testigo.localidad) : ""}
                                                        ${testigo.barrio? testigo.barrio + ", " : ""} 
                                                        ${testigo.domicilio? testigo.domicilio : ""}
                                                    </p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Informacion Adicional:</span> ${testigo.informacionAdicional? testigo.informacionAdicional: "Sin Especificar" }</p>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                                `:
                                `
                                <div class="px-4 mb-4" id="datos4">
                                    <div class="card border-3 d-flex justify-content-center p-3">
                                        <h5 class="fw-bold text-center">Los Testigos no fueron reconocidos</h5>
                                    </div>
                                    ${
                                        testigos.map(testigo => `
                                            <div class="col-12 card p-3">
                                            <p>
                                                <span class="fw-bold">Informacion Adicional:</span> 
                                                <span class="">${testigo.informacionAdicional? testigo.informacionAdicional: "Sin Especificar" }</span>
                                            </p>
                                            </div>
                                        `).join('') 
                                    }
                                </div>
                            `
                        ):
                        `
                            <div class="card border-3 d-flex justify-content-center p-3">
                                <h5 class="fw-bold text-center">No Hubo Testigos del Hecho</h5>
                            </div>
                        `
                    }
                </div>

                <div class="p-3" id="item16">
                    <div class="mb-4" id="datos5">
                        <div class="card border-3 d-flex justify-content-center p-3">
                            <h3 class="fw-bold text-center">Adjunto/Evidencias</h3>
                        </div>
                        
                        ${adjuntos && `
                            <div class="row px-3 row-cols-1 g-4">
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
                </div>

                <div class="p-3" id="item17">
                    <p class="fw-bold fs-4">Informacion Adicional:</p>
                    <p class="px-3 text-wrap">${denuncia.informacionAdicional? denuncia.informacionAdicional:'Sin informacion adicional'}</p>
                </div>

                <div class="p-4" id="item18">
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

                <div class="p-4" id="item19">
                    <div class="" style="font-size: xx-small;">
                        <h5 class="text-center fw-bold my-2">ARTÍCULO 40º</h5>
                        <p class="text-wrap m-0 p-0"">La aplicación de un criterio de oportunidad, será notificada a la víctima al domicilio constituido. Si hubiese mudado de domicilio, tendrá la carga de informarlo al fiscal. Las notificaciones que se practiquen en el domicilio constituido tendrán efectos en el proceso. La imposibilidad de dar con el paradero de la víctima no obstará a la aplicación de los criterios de oportunidad. Al momento de radicar la denuncia deberá hacerse conocer a la víctima el presente artículo.</p>
                        <p class="text-wrap m-0 p-0"">De mediar oposición fundada de la víctima dentro del plazo de tres (3) días, las actuaciones serán remitidas al Fiscal General de la Acusación para que la resuelva. Sin perjuicio de lo anterior el Fiscal General de la Acusación, podrá proceder de oficio a la revisión de la razonabilidad y legalidad del archivo, para lo cual resultará obligatoria su comunicación.</p>
                    </div>
                </div>

                <div class="p-4" id="item20">
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
        </body>
    </html>
    `

    //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

    const denunciaBusqueda = `<!DOCTYPE html>
    <html lang="en">
    
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!--<link href="./static/css/bootstrap.min.css" rel="stylesheet">-->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        </head>
    
        <body>
            <div id="contenedorBase">
                <div class="px-3" id="item1">
                    <div class="d-flex justify-content-center align-items-center">
                        <img src="https://sistema.mpajujuy.gob.ar/images/logompa2.png" alt="Logo MPA" class="img-fluid w-25 h-25">
                    </div>
                    <div class="mb-4 d-grid">
                        <h3 class="fw-bold col text-center d-flex align-items-center justify-content-center">
                            DENUNCIA DE DESAPARICION DE PERSONAS
                        </h3>
                    </div>
                    <div class="mb-3">
                        <h4 class="fw-bold border py-2 px-1">RECEPTOR DE LA DENUNCIA</h4>
                        <div class="card p-4 border">
                            <p><span class="fw-bold">FECHA: </span> <span class="">${denuncia.fechaDenuncia + " " + denuncia.horaDenuncia }</span></p>
                            <p><span class="fw-bold">LUGAR: </span> <span class="">${usuario.lugar}</span></p>
                            <p><span class="fw-bold">NOMBRE COMPLETO: </span> <span class="">${usuario.nombre +" "+ usuario.apellido}</span></p>
                            <p><span class="fw-bold">FUNCION Y GRADO: </span> <span class="">${denuncia.funcionGrado? denuncia.funcionGrado : "Sin Especificar" }</span></p>
                            <p><span class="fw-bold">FUERZA, INSTITUCIÓN, ORGANIZACIÓN: </span> <span class="">${usuario.fuerza}</span></p>
                        </div>
                    </div>
                    
                </div>
                <div class="p-3" id="item2">
                    <div class="mb-3">
                        <h4 class="fw-bold border py-2 px-1">TIPO DE DENUNCIA</h4>
                        <p class="fw-bold ">Marcar lo que corresponda</p>
                        <div class="card p-4 border">
                            <ul class="list-group">
                                <li class="list-group-item">
                                  <input class="form-check-input me-1 ${denuncia.fugaHogar? "checked" : ""}" type="checkbox" value="" aria-label="...">
                                    FUGA DEL HOGAR
                                </li>
                                <li class="list-group-item">
                                  <input class="form-check-input me-1 ${denuncia.trataPersonas? "checked" : ""}" type="checkbox" value="" aria-label="...">
                                    FUGA DE UNA INSTITUCIÓN ( de salud, hogar, asilo, etc. ) 
                                </li>
                                <li class="list-group-item">
                                  <input class="form-check-input me-1 ${denuncia.fugaInstitucion? "checked" : ""}" type="checkbox" value="" aria-label="...">
                                    DESAPARICIÓN
                                </li>
                                <li class="list-group-item">
                                  <input class="form-check-input me-1 ${denuncia.averiguacionParadero? "checked" : ""}" type="checkbox" value="" aria-label="...">
                                    TRATA DE PERSONAS
                                </li>
                                <li class="list-group-item">
                                  <input class="form-check-input me-1 ${denuncia.desaparcicion? "checked" : ""}" type="checkbox" value="" aria-label="...">
                                    AVERIGUACIÓN DE PARADERO
                                </li>
                                <li class="list-group-item">
                                    <input class="form-check-input me-1 ${denuncia.violenciaInstitucional? "checked" : ""}" type="checkbox" value="" aria-label="...">
                                      VIOLENCIA INSTITUCIONAL
                                </li>
                                <li class="list-group-item"> 
                                <input class="form-check-input me-1 ${denuncia.otro? "checked" : ""}" type="checkbox" value="" aria-label="...">
                                    OTRO
                                </li>
                              </ul>                       
                        </div>
                    </div>
                </div>
                <div class="p-3" id="item3">
                    <div class="mb-3">
                        <p class="fw-bold ">Fiscal Interviniente: NOSEEEEEEEEEEEE</p>
                        <h4 class="fw-bold border py-2 px-1">INFORMACION DE LA PERSONA DENUNCIANTE</h4>
                        ${
                            denunciantes.map((den, index) => `
                                <div class="row mx-1 justify-content-center">
                                    <div class="col-12">
                                        <div class="card my-3 py-1">
                                            <div class="row">
                                                <div class="col">
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Apellido:</span> ${den.apellido}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Nombre:</span> ${den.nombre}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Alias:</span> ${den.alias? den.alias: "Sin Especificar"}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Nacionalidad:</span> ${den.nacionalidad? den.nacionalidad : `Sin Especificar`}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Identificacion:</span> ${den.tipoIdentificacion} ${den.numeroIdentificacion}</p>
                                                </div>
                                                <div class="col">
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Fecha de Nacimiento:</span> ${den.fechaNacimiento}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Género:</span> ${den.identidadAutopercibida? den.identidadAutopercibida : `Sin Especificar`}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Móvil:</span> ${den.telefonoMovil? den.telefonoMovil : "Sin Especificar"}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Fijo:</span> ${den.telefonoFijo? den.telefonoFijo : "Sin Especificar"}</p>
                                                    <p class="mt-2 ms-3"><span class="fw-bold">Correo Electrónico:</span> ${den.email}</p>
                                                    ${victimasRelaciones[index] && victimasRelaciones[index].conocimientoVictima !== 0? 
                                                        `
                                                            <p class="mt-2 ms-3"><span class="fw-bold">Vinculo con la persona buscada:</span> ${victimasRelaciones[index].vinculoVictima !== "Otro"? victimasRelaciones[index].vinculoVictima : victimasRelaciones[index].detalleVinculo }</p>
                                                        `:`
                                                            <p class="mt-2 ms-3"><span class="fw-bold">No conoce a la victima</span></p>
                                                        `
                                                    }
                                                </div>
                                            </div>
                                            <p class="mt-2 ms-3"><span class="fw-bold">Ubicación:</span> 
                                                ${den.provincia? den.provincia + ", "  : ""} 
                                                ${den.localidad? (den.barrio? den.localidad + ", ": den.localidad) : ""}
                                                ${den.barrio? den.barrio + ", " : ""} 
                                                ${den.domicilio? den.domicilio : ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')
                        }
                    </div>
                </div>
                <div class="p-3" id="item4">
                    <div class="mb-3">
                        <h4 class="fw-bold border py-2 px-1">INFORMACION GENERAL DE LA PERSONA BUSCADA</h4>
                        ${victimas.length !== 0?
                            `
                            <div class="px-4 mb-4" id="2">
                                <div class="row mx-1 justify-content-center">
                                    ${ 
                                        victimas.map((victima) => `
                                        <div class="col-12">
                                            <div class="card my-3 py-1">
                                                <div class="row">
                                                    <div class="col">
                                                        <p class="mt-2 ms-3"><span class="fw-bold">Apellido:</span> ${victima.apellido}</p>
                                                        <p class="mt-2 ms-3"><span class="fw-bold">Nombre:</span> ${victima.nombre}</p>
                                                        <p class="mt-2 ms-3"><span class="fw-bold">Alias:</span> ${victima.alias? victima.alias: "Sin Especificar"}</p>
                                                        <p class="mt-2 ms-3"><span class="fw-bold">Nacionalidad:</span> ${victima.nacionalidad? victima.nacionalidad : `Sin Especificar`}</p>
                                                        <p class="mt-2 ms-3"><span class="fw-bold">Identificacion:</span> ${victima.tipoIdentificacion} ${victima.numeroIdentificacion}</p>
                                                    </div>
                                                    <div class="col">
                                                        <p class="mt-2 ms-3"><span class="fw-bold">Fecha de Nacimiento:</span> ${victima.fechaNacimiento}</p>
                                                        <p class="mt-2 ms-3"><span class="fw-bold">Género:</span> ${victima.identidadAutopercibida? victima.identidadAutopercibida : `Sin Especificar`}</p>
                                                        <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Móvil:</span> ${victima.telefonoMovil? victima.telefonoMovil : "Sin Especificar"}</p>
                                                        <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Fijo:</span> ${victima.telefonoFijo? victima.telefonoFijo : "Sin Especificar"}</p>
                                                        <p class="mt-2 ms-3"><span class="fw-bold">Correo Electrónico:</span> ${victima.email}</p>
                                                    </div>
                                                </div>
                                                <p class="mt-2 ms-3"><span class="fw-bold">Ubicación:</span> 
                                                    ${victima.provincia? victima.provincia + ", "  : ""} 
                                                    ${victima.localidad? (victima.barrio? victima.localidad + ", ": victima.localidad) : ""}
                                                    ${victima.barrio? victima.barrio + ", " : ""} 
                                                    ${victima.domicilio? victima.domicilio : ""}
                                                </p>
                                            </div>
                                        </div>
                                        `).join('')
                                    }
                                </div>
                            </div>
                            `:``
                        }
                    </div>
                </div>
    
                <div class="p-3" id="item5">
                    <div class="mb-3">
                        <h4 class="fw-bold border py-2 px-1">EN CASO DE ESTAR EN PAREJA</h4>
                        <div class="card p-4 border">
                            <p><span class="fw-bold">NOMBRE DEL CÓNJUGE: </span> <span class="">${denuncia.nombreConyugue? denuncia.nombreConyugue : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">DATOS DE CONTACTO: </span> <span class="">${denuncia.datosContactoConyugue? denuncia.datosContactoConyugue : "Sin especificar"}</span></p>
                            <p><span class="fw-bold">DOMICILIO: </span> <span class="">${denuncia.domicilioConyugue? denuncia.domicilioConyugue : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">TELEFONO DE LINEA: </span> <span class="">${denuncia.telefonoLineaConyugue? denuncia.telefonoLineaConyugue : "Sin especificar" }</span></p>
                            <p><span class="fw-bold">CELULAR: </span> <span class="">${denuncia.celularConyugue? denuncia.celularConyugue : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">CORREO ELECTRONICO: </span> <span class="">${denuncia.emailConyugue? denuncia.emailConyugue : "Sin Especificar"}</span></p> 
                        </div>
                    </div>
                </div>
    
                <div class="p-3" id="item6">
                    <div class="mb-3">
                        <h4 class="fw-bold border py-2 px-1">EN CASO DE CORRESPONDER DATOS DE LAS HIJAS/OS</h4>
    
                        <p class="fw-bold ">DATOS DEL PADRE</p>
    
                        <div class="card p-4 border">
                            <p><span class="fw-bold">NOMBRE COMPLETO: </span> <span class="">${denuncia.nombrePadre? denuncia.nombrePadre : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">DNI N°: </span> <span class="">${denuncia.dniPadre? denuncia.dniPadre : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">DATOS DE CONTACTO: </span> <span class="">${denuncia.datosContactoPadre? denuncia.datosContactoPadre : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">DOMICILIO: </span> <span class="">${denuncia.domicilioPadre? denuncia.domicilioPadre : "Sin Especificar" }</span></p>
                            <p><span class="fw-bold">TELEFONO DE LINEA: </span> <span class="">${denuncia.telefonoLineaPadre? denuncia.telefonoLineaPadre : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">CELULAR: </span> <span class="">${denuncia.celularPadre? denuncia.celularPadre : "Sin Especificar" }</span></p>
                            <p><span class="fw-bold">CORREO ELECTRONICO: </span> <span class="">${denuncia.emailPadre? denuncia.emailPadre : "Sin Especificar"}</span></p>
                        
                        </div>
    
                        <p class="fw-bold ">DATOS DE LA MADRE</p>
    
                        <div class="card p-4 border">
                            <p><span class="fw-bold">NOMBRE COMPLETO: </span> <span class="">${denuncia.nombreMadre? denuncia.nombreMadre : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">DNI N°: </span> <span class="">${denuncia.dniMadre? denuncia.dniMadre : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">DATOS DE CONTACTO: </span> <span class="">${denuncia.datosContactoMadre? denuncia.datosContactoMadre : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">DOMICILIO: </span> <span class="">${denuncia.domicilioMadre? denuncia.domicilioMadre : "Sin Especificar" }</span></p>
                            <p><span class="fw-bold">TELEFONO DE LINEA: </span> <span class="">${denuncia.telefonoLineaMadre? denuncia.telefonoLineaMadre : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">CELULAR: </span> <span class="">${denuncia.celularMadre? denuncia.celularMadre : "Sin Especificar" }</span></p>
                            <p><span class="fw-bold">CORREO ELECTRONICO: </span> <span class="">${denuncia.emailMadre? denuncia.emailMadre : "Sin Especificar"}</span></p>
                        
                        </div>
                    </div>
                </div>
    
                <div class="p-3" id="item7">
                    <div class="mb-3">
                        <h4 class="fw-bold border py-2 px-1">¿LA PERSONA BUSCADA TRABAJABA?</h4>
                        <div class="card p-4 border">
                            <p><span class="fw-bold">LUGAR: </span> <span class="">${denuncia.lugarTrabajo? denuncia.lugarTrabajo : "No"}</span></p>
                            <p><span class="fw-bold">FUNCIÓN QUE DESEMPEÑABA: </span> <span class="">${denuncia.funcionTrabajo? denuncia.funcionTrabajo : "No"}</span></p>
                        </div>
                    </div>
    
                    <div class="mb-3">
                        <h4 class="fw-bold border py-2 px-1">DATOS DE COMPAÑERAS/OS</h4>
                        <div class="card p-4 border">
                            <p>${denuncia.datosCompañerosTrabajo? denuncia.datosCompañerosTrabajo : "No"}</p>
                        </div>
                    </div>
                        
                </div>
    
                <div class="p-3" id="item8">
                    <div class="mb-3">
                        <h4 class="fw-bold border py-2 px-1">¿LA PERSONA BUSCADA ESTUDIABA?</h4>
                        <div class="card p-4 border">
                            <p><span class="fw-bold">LUGAR: </span> <span class="">${denuncia.lugarEstudio? denuncia.lugarEstudio : "No"}</span></p>
                            <p><span class="fw-bold">DIRECCIÓN: </span> <span class="">${denuncia.direccionEstudio? denuncia.direccionEstudio : "No"}</span></p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <h4 class="fw-bold border py-2 px-1">DATOS DE COMPAÑERAS/OS</h4>
                        <div class="card p-4 border">
                            <p>${denuncia.datosCompañerosEstudio? denuncia.datosCompañerosEstudio : "No"}</p>
                        </div>
                    </div>
                    
                </div>
    
                <div class="p-3" id="item9">
                    <div class="mb-3">
                        <h4 class="fw-bold border py-2 px-1">DATOS DEL HECHO</h4>
                        <div class="card p-4 border">
                            <p><span class="fw-bold">FECHA DE DESAPARICIÓN: </span> <span class="">${denuncia.fechaDesaparicion? denuncia.fechaDesaparicion : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">LUGAR DE DESAPARICIÓN: </span> <span class="">${denuncia.lugarDesaparicion? denuncia.lugarDesaparicion : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">VESTIMENTA AL MOMENTO DE DESAPARECER: </span> <span class="">${denuncia.vestimentaDesaparicion? denuncia.vestimentaDesaparicion : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">EFECTOS PERSONALES: </span> <span class="">${denuncia.efectosPersonales? denuncia.efectosPersonales : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">CAMBIOS RECIENTES EN LA PERSONA DESAPARECIDA (habitos, lugares, o personas a las que frecuentaba, etc): </span> <span class="">${denuncia.cambiosRecientes? denuncia.cambiosRecientes : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">PUEDE RECORDAR ALGUNA PERSONA QUE HAYA MOSTRADO RECIENTEMENTE UNA ATENCION O INTERES INUSITADO EN LA PEROSNA DESAPARECIDA: </span> <span class="">${denuncia.personaInteres? denuncia.personaInteres : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">¿ESTABA BUSCANDO TRABAJO?: </span> <span class="">${denuncia.busquedaTrabajo? "Si" : "No"}</span></p>                  
                        </div>
                    </div>
                </div>
    
                <div class="p-3" id="item10">
                    <div class="mb-3">
                        <div class="card p-4 border">
                            <p><span class="fw-bold">CONTEXTO DE DESAPARICIÓN: </span> <span class="">${denuncia.contextoDesaparicion? denuncia.contextoDesaparicion : "Sin Especificar"}</span></p>                 
                        </div>
                    </div>
                </div>
    
                <div class="p-3" id="item11">
                    <div class="mb-3">
                        <div class="card p-4 border">
                            <p><span class="fw-bold">RELATO DEL HECHO: </span> <span class="">${denuncia.relatoHecho? denuncia.relatoHecho : "Sin Especificar"}</span></p>                 
                        </div>
                    </div>
                </div>
    
                <div class="p-3" id="item12">
                    <div class="mb-3">
                        <h4 class="fw-bold border py-2 px-1">TESTIGOS O PERSONAS QUE PUDIERAN APORTAR DATOS DEL HECHO</h4>
                        ${denuncia.testigo?
                            (denuncia.datosTestigo?
                                `
                                    <div class="px-4 mb-4" id="datos4">    
                                        <div class="row mx-1 justify-content-around" id="testigos">
                                            ${testigos.map(testigo =>  `
                                                <div class="col-12">
                                                    <div class="card my-3 py-1">
                                                        <div class="row">
                                                            <div class="col">
                                                                <p class="mt-2 ms-3"><span class="fw-bold">Tipo Persona:</span> ${testigo.tipoPersona}</p>
                                                                <p class="mt-2 ms-3"><span class="fw-bold">Apellido:</span> ${testigo.apellido}</p>
                                                                <p class="mt-2 ms-3"><span class="fw-bold">Nombre:</span> ${testigo.nombre}</p>
                                                                <p class="mt-2 ms-3"><span class="fw-bold">Alias:</span> ${testigo.alias? testigo.alias: "Sin Especificar"}</p>
                                                                <p class="mt-2 ms-3"><span class="fw-bold">Nacionalidad:</span> ${testigo.nacionalidad? testigo.nacionalidad : `Sin Especificar`}</p>
                                                                <p class="mt-2 ms-3"><span class="fw-bold">Identificacion:</span> ${testigo.tipoIdentificacion} ${testigo.numeroIdentificacion}</p>
                                                            </div>
                                                            <div class="col">
                                                                <p class="mt-2 ms-3"><span class="fw-bold">Fecha de Nacimiento:</span> ${testigo.fechaNacimiento}</p>
                                                                <p class="mt-2 ms-3"><span class="fw-bold">Género:</span> ${testigo.identidadAutopercibida? testigo.identidadAutopercibida : `Sin Especificar`}</p>
                                                                <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Móvil:</span> ${testigo.telefonoMovil? testigo.telefonoMovil : "Sin Especificar"}</p>
                                                                <p class="mt-2 ms-3"><span class="fw-bold">Teléfono Fijo:</span> ${testigo.telefonoFijo? testigo.telefonoFijo : "Sin Especificar"}</p>
                                                                <p class="mt-2 ms-3"><span class="fw-bold">Correo Electrónico:</span> ${testigo.email}</p>
                                                            </div>
                                                        </div>
                                                        <p class="mt-2 ms-3"><span class="fw-bold">Ubicación:</span> 
                                                            ${testigo.provincia? testigo.provincia + ", "  : ""} 
                                                            ${testigo.localidad? (testigo.barrio? testigo.localidad + ", ": testigo.localidad) : ""}
                                                            ${testigo.barrio? testigo.barrio + ", " : ""} 
                                                            ${testigo.domicilio? testigo.domicilio : ""}
                                                        </p>
                                                        <p class="mt-2 ms-3"><span class="fw-bold">Informacion Adicional:</span> ${testigo.informacionAdicional? testigo.informacionAdicional: "Sin Especificar" }</p>
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                    `:
                                    `
                                    <div class="px-4 mb-4" id="datos4">
                                        <div class="card border-3 d-flex justify-content-center p-3">
                                            <h5 class="fw-bold text-center">Los Testigos no fueron reconocidos</h5>
                                        </div>
                                        ${
                                            testigos.map(testigo => `
                                                <div class="col-12 card p-3">
                                                <p>
                                                    <span class="fw-bold">Informacion Adicional:</span> 
                                                    <span class="">${testigo.informacionAdicional? testigo.informacionAdicional: "Sin Especificar" }</span>
                                                </p>
                                                </div>
                                            `).join('') 
                                        }
                                    </div>
                                `
                            ):
                            `
                                <div class="card border-3 d-flex justify-content-center p-3">
                                    <h5 class="fw-bold text-center">No Hubo Testigos del Hecho</h5>
                                </div>
                            `
                        }
                    </div>
                </div>
    
                <div class="p-3" id="item13">
                    <div class="mb-3">
                        <h4 class="fw-bold border py-2 px-1">CARACTERISTICAS FISICAS</h4>
                        <div class="card p-4 border">
                            <p><span class="fw-bold">CARACTERISTICAS GENERALES (preguntar: color de pelo, ojos, tatuajes, rasgos faciales, etc) : </span> <span class="">${denuncia.caracteristicasGenerales? denuncia.caracteristicasGenerales : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">ALTURA: </span> <span class="">${denuncia.altura? denuncia.altura : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">ENFERMEDADES (CONGÉNITAS/PATOLOGÍCAS): </span> <span class="">${denuncia.enfermedades? denuncia.enfermedades : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">FRACTURAS: </span> <span class="">${denuncia.fracturas? denuncia.fracturas : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">RASGOS ODONTOLOGICOS (preguntar: extracciones, protesís, aparatos, tratamientos, etc): </span> <span class="">${denuncia.rasgosOdontologicos? denuncia.rasgosOdontologicos : "No"}</span></p>
                            <p><span class="fw-bold">OBSERVACIONES / COMENTARIOS: </span> <span class="">${denuncia.observaciones? denuncia.observaciones : "Sin Especificar"}</span></p>
                            <p><span class="fw-bold">FICHAS DENTALES: </span> <span class="">${denuncia.fichasDentales? "Si" : "No"}</span></p>     
                            <p><span class="fw-bold">FICHAS DACTILOSCOPICAS: </span> <span class="">${denuncia.fichasDactiloscopicas? "Si" : "No"}</span></p>       
                            <p><span class="fw-bold">FOTO: </span> <span class="">${denuncia.fotoCaracteristicas? "Si" : "No"}</span></p>
                        </div>
                    </div>
                </div>
        </body>
    </html>`

    if(denuncia.tipoDenuncia != "Busqueda de Personas" ){
        return denunciaTipica;
    }else{
        return denunciaBusqueda;
    }
}


// getComprobanteHtml(denuncia,denunciantes,testigos,denunciados,victimas,adjuntos);
module.exports = { getComprobanteHtml }