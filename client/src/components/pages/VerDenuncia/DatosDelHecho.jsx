import { Divider } from "primereact/divider"
import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { MultiSelect } from 'primereact/multiselect';
import { VehiculosInvolucradosTable } from "./TablasVerDenuncia/VehiculosInvolucradosTable";
import { ObjetosSustraidosTable } from "./TablasVerDenuncia/ObjetosSustraidosTable";

export const DatosDelHecho = (tipo) => {
    const tipoDenuncia = tipo.tipo;
    return (
        <>
            <h2>Datos del Hecho</h2>

            <h3>¿Qué Pasó?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque quisquam fuga ex minima nostrum distinctio veniam praesentium officia sequi consequatur nesciunt porro, doloremque officiis labore eveniet sit alias aperiam.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam non aliquid repellat nostrum cupiditate impedit officia cumque obcaecati ipsum voluptates harum, dicta est consequatur, eligendi, reprehenderit quos animi ullam aspernatur.
            </p>
            <Button label='Modificar' size='small' />

            <Divider />

            <h3>¿Cómo Pasó?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe cumque quod illo? Voluptate nostrum porro recusandae doloribus incidunt. Dicta ducimus, illum enim quaerat officiis veritatis ullam provident at cumque facilis.
                Laborum laudantium, autem corrupti cum at fugit deleniti consequuntur molestias, repellat ex illo vero, harum earum labore provident. Reprehenderit libero accusamus vitae commodi illo tempora dolores quod mollitia corporis! Aspernatur.</p>
            <Button label='Modificar' size='small' />

            {/* En caso de llegar una denuncia de Robo/Hurto */}
            {
                tipoDenuncia === "robo/hurto" && (
                    <div className="grid">
                        <div className="col pt-4">
                            <Dropdown
                                placeholder='Objetos Sustraidos'
                            />
                        </div>
                        <div className="col pt-4">
                            <MultiSelect
                                placeholder='Circunstancias del hecho'
                            />
                        </div>
                    </div>
                )
            }

            <Divider />

            <h3>¿Dónde Pasó?</h3>
            <div className="grid">
                <div className="col">
                    <h4>Ciudad del Hecho: </h4>
                    <h4>Barrio: </h4>
                    <h4>Calle: </h4>
                    <h4>Piso: </h4>
                    <h4>Departamento: </h4>
                </div>
                <div className="col">
                    <img src="https://www.nuevojujuy.com.ar/images/03-Mar2022/Google-Maps-Sitios-Memoria-Jujuy-02.jpg" className='w-10 h-18rem' alt="" />
                </div>
            </div>

            <Divider />

            <h3>Informacion Adicional</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, nesciunt quaerat. Ratione rem quo quod veniam illo, repellendus corrupti aliquam explicabo ducimus iste dolorem, obcaecati tenetur fugit ab vel unde.
                Laudantium quasi, amet illum eum provident minima exercitationem quo hic temporibus, nulla libero earum ipsa consequuntur obcaecati perferendis vitae autem at officiis corrupti dolorem id assumenda nam inventore suscipit? Laudantium.</p>

            <Divider />

            <h3>Adjuntos / Evidencias</h3>
            <h4>Descripción: </h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae sint adipisci, laudantium dicta cumque sequi explicabo vitae saepe unde ex eius non placeat quod at esse ducimus molestias culpa vel?
                Velit dignissimos eaque excepturi optio sed asperiores soluta impedit magni ad esse ea distinctio quisquam quia minima officia sequi, perferendis voluptatibus expedita sint eveniet repellendus vero. Dicta accusamus debitis fugit!</p>
            <h4>Adjuntos: </h4>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png" className="w-1 p-1" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQTliJEbXiRic3bf7HoMVdEPR9fvMLjyDWWg&usqp=CAU" className="p-1" />

            <Divider />

            {/* En caso de Violencia de Genero */}
            {
                tipoDenuncia === "violenciaDeGenero" ? (
                    <h3>Anexo de Violencia de Genero</h3>
                ) : tipoDenuncia === "siniestrosViales" ? (
                    <VehiculosInvolucradosTable />
                ) : tipoDenuncia === "robo/hurto" ? (
                    <ObjetosSustraidosTable/>
                ) : null
            }

            <Divider />

            <h3>Denuncia Digital Firmada</h3>
        </>
    )
}
