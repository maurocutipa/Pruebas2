import { useEffect, useState, useRef } from "react"
import { LacunaWebPKI } from 'web-pki'
import api from '@/api'
import axios from "axios"
import { ModalFirmaDigital } from "../../components/common/ModalFirmaDigital"
export const Firmar = () => {

    const [certs, setCerts] = useState(null)
    const [cert, setCert] = useState('')
    const [file, setFile] = useState(null)
    const [token, setToken] = useState('')
    const [signers, setSigners] = useState(null)

    //create a file ref
    const fileRef = useRef(null)
    const fileCheckRef = useRef(null)
    
    let pki = new LacunaWebPKI();

    useEffect(() => {

        pki.listCertificates().success(certs => {
            setCerts(certs)
        });
    }, [])


    const handleSelect = (e) => {
        setCert(e.target.value)
    }

    const firmar = () => {
        if(!token || !cert) return;
        pki.signWithRestPki({
            token: token,
            thumbprint: cert
        }).success(() => {
            api.post('http://localhost:4000/api/restpki/finish-signature', {token: token}).then(res => {
                //console.log(res);
                console.log(res);
            })
        });
    }

    

    const reloadCerts = () => {
        pki.listCertificates().success(function (certs) {
            setCerts(certs)
        });
    }

    const handleSelectFile = (e) => {
        setFile(e.target.files[0])
    }

    const startFirma = () => {
        if (file) {
            const data = new FormData()
            data.append('fileFirma', file)
            axios.post('http://localhost:4000/api/restpki/start-signature', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res);
                setToken(res.data.token)
            })
        }
    }
    
    const verificarFirma = () => {
        if(fileCheckRef.current.files[0]){
            const data = new FormData()
            data.append('fileFirma', fileCheckRef.current.files[0])
            axios.post('http://localhost:4000/api/restpki/verify-signature', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                
                setSigners(res.data.signature._signers)
                console.log(res.data.signature._signers);
            })
        }
    }

    const [visibleModal, setVisibleModal] = useState(true)

    return (
        <div>
            <ModalFirmaDigital visible={visibleModal} setVisible={setVisibleModal} />
            <h1>FIRMA DIGITAL</h1>
            <div>
                <h1>VALIDAR FIRMA DIGITAL</h1>
                <input type="file" name="fileCheck" id="fileCheck" ref={fileCheckRef} />
                <br />
                <button onClick={verificarFirma}>Verificar</button>
                {
                    signers && (
                        <span>Firmas: {signers.length}</span>
                    )
                }
            </div>
            <div style={{ marginTop: '3em' }}>
                <h1>ARCHIVO A FIRMAR</h1>
                {/* add use ref */}
                <input type="file" name="file" id="file" ref={fileRef} onChange={handleSelectFile} />
            </div>
            {
                file && (
                    <div style={{ marginTop: '3em' }}>
                        <h1>CERTIFICADOS</h1>
                        <select name="asdasd" id="asdasd" onChange={handleSelect}>
                            <option value={''}>Seleccione un certificado</option>
                            {
                                certs && certs.map((c, index) => (<option key={index} value={c.thumbprint}>{c.subjectName}</option>))
                            }
                        </select>
                        <br />
                        <button onClick={reloadCerts}>Recargar Certificados</button>
                    </div>
                )
            }
            <div style={{ marginTop: '3em' }}>
                {cert && <button onClick={startFirma}>Comenzar Firma</button>}
                {token && cert && <button onClick={firmar}>Fimar</button>}
            </div>
            <div style={{ marginTop: '3em' }}>
                <strong>Token: </strong><span>{token}</span>
            </div>
        </div>
    )
}
