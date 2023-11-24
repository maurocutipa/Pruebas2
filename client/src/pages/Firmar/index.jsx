import { useEffect, useState } from "react"
import api from '@/api'

export const Firmar = () => {

    const [token, setToken] = useState('')
    const [certs, setCerts] = useState(null)

    var pki = new LacunaWebPKI('AiEAKi5sYWN1bmFzb2Z0d2FyZS5jb20sanNmaWRkbGUubmV0AAADAFBybwgAAJhSU6eP3AgAAXGQPqewIV4abxw5eh8GZbjYkH5W/JK8lFNbqP0D1hjT5w6Qv3b0Gjb/IrGJ9jjFrB/kVq3StZdY6jXY65iowizIt1Jwhv5RD864TqBMW6IaHAt3YSx7OBJE79PDp1kr8+WmUNkABsqQSPaaLIRsJs5hPx2hvqgmtXTlxWEzaYwLkI+D7mkoKKCIoU3kK+mxA3RXPD27DvckKFeVVQ0aFIF+lnw/Vf++zOtD/5a3SSTZAsEifJfUqauU+FA34MKF/tBnXxhEdv44Kf3aL+cduZlE4dKMmTh9gzaaA1uZiI9O0OTZqYJEocFauDzr8rPAq9UBz1wHfZV8is/iv8oZp5E=');

    const authenticate = async (cert) => {
        const { data } = await api.get('http://localhost:4000/api/web-pki/authenticationStart', {}, {})
        setToken(data)
        pki.signWithRestPki({
            token: data,
            thumbprint: cert
        }).success(async function () {
	       
            const { data: data2 } = await api.post('http://localhost:4000/api/web-pki/completeAuthentication', { token: data })

            console.log(data2);
	    });
        
        return 'asdasd'
    }

    useEffect(() => {

        pki.listCertificates().success(function (certs) {
            setCerts(certs)
            /* for (var i = 0; i < certs.length; i++) {
                var cert = certs[i];
                console.log(cert);
                authenticate().then(res => {
                    console.log(res);
                })
            } */
        });
    }, [])


    const handleSelect = (e) => {
        console.log(e.target.value);
        if (e.target.value)
            authenticate(e.target.value).then(res => {
                console.log(res);
            })
    }

    return (
        <div>
            <h1>HOLA MUNDO</h1>
            <h1>CERTIFICADOS</h1>
            <select name="asdasd" id="asdasd" onChange={handleSelect}>
                <option value={''}>Seleccione un certificado</option>
                {
                    certs && certs.map((c, index) => (<option key={index} value={c.thumbprint}>{c.subjectName + ' (issued by ' + c.issuerName + ')'}</option>))
                }
            </select>
            <br />
            <strong>SERVER RES TOKEN AUTH: </strong><span>{token}</span>
            <br />
            {/* <strong>SERVER RES COMPLETE: </strong><span>asdasdasd</span>
 */}
        </div>
    )
}
