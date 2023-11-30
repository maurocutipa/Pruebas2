import { useState } from "react"

import { ModalFirmaDigital } from "../../components/common/ModalFirmaDigital"
export const Firmar = () => {
    const [visibleModal, setVisibleModal] = useState(true)

    return (
        <div>
            <ModalFirmaDigital visible={visibleModal} setVisible={setVisibleModal} temporal={true} execAction={()=>{}}>
                <div>
                    <h1>Modal</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et cum, fugit maiores illo deserunt veniam, suscipit voluptatum, corporis soluta ipsa ullam. Illum, porro mollitia molestias architecto temporibus nesciunt laborum incidunt.</p>
                </div>
            </ModalFirmaDigital>
            
        </div>
    )
}
