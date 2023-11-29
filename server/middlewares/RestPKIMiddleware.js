const showError = require('../utils/showError')
const httpErrorHandler = require('../utils/httpErrorHandler')
const restpkiConfig = require('../config/restpki')
const fs = require('fs');
const path = require('path');
const { PKI } = require('../utils/pki')
const crypto = require('crypto')
const queryHandler = require('../utils/queryHandler')

/* const {
    PadesSignatureStarter,
    PadesSignatureFinisher,
    PadesMeasurementUnits,
    StandardSignaturePolicies,
    PadesSignatureExplorer
} = require('restpki-client'); */

const {
    PadesSignatureStarter,
    StandardSignaturePolicies,
    SignatureFinisher
} = require('pki-express');

const { PadesVisualElementsRestPki } = require('../utils/pki/pades-visualization');

const RestPKIMiddleware = {}


RestPKIMiddleware.startSignature = async (req, res) => {
    try {
        const codigo = PKI.generateVerificationCode()

        const certThumb = req.body.certThumb;
        const certContent = req.body.certContent;


        // Get an instance of the PadesSignatureStarter class, responsible for
        // receiving the signature elements and start the signature process.
        const signatureStarter = new PadesSignatureStarter();

        PKI.setPkiDefaults(signatureStarter);

        signatureStarter.signaturePolicy = StandardSignaturePolicies.PADES_BASIC_WITH_LTV;

        // Set PDF to be signed.
        await signatureStarter.setPdfToSignFromBase64(req.file.buffer.toString('base64'));


        await signatureStarter.setCertificateFromBase64(certContent);

        const visualRepresentation = await PadesVisualElementsRestPki.getVisualRepresentation(codigo)

        // Set the visual representation to signatureStarter.
        await signatureStarter.setVisualRepresentation(visualRepresentation)

        const { toSignHash, digestAlgorithm, transferFile } = await signatureStarter.start()


        //rename file with transferFile code
        const filename = `${transferFile}.pdf` //
        fs.writeFileSync(path.join(__dirname, '../uploads/firma-digital/', filename), req.file.buffer)

        res.status(200).json({
            toSignHash,
            digestAlgorithm,
            transferFile,
            certThumb,
            codigo
        });
    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

RestPKIMiddleware.finishSignature = async (req, res) => {
    try {

        const transferFile = req.body.transferFile
        const signature = req.body.signature


        const signatureFinisher = new SignatureFinisher();

        PKI.setPkiDefaults(signatureFinisher);


        const pathFile = path.join(__dirname, '../uploads/firma-digital/', `${transferFile}.pdf`)

        await signatureFinisher.setFileToSignFromPath(pathFile);

    
        await signatureFinisher.setTransferFileFromPath(transferFile);

        signatureFinisher.signature = signature;

        //generate random name
        const filename = `${crypto.randomBytes(8).toString('hex')}.pdf` //

        signatureFinisher.outputFile = path.join(__dirname, '../uploads/firma-digital/', filename)

        /* if (req.body.typeSignature == 'temporal') {
            const filePath = path.join(__dirname, '../uploads/firma-digital/temp/7b5af4e061e472c4.pdf')
            fs.unlinkSync(filePath)
            res.send('Firma temporal creada')
            return
        } */

        const certificate = await signatureFinisher.complete(true)

        const resQuerie = await queryHandler("INSERT INTO firma_verificar(codigo,ruta,nombreArchivo) VALUES(?,?,?)", [req.body.codigo, '/firma-digital/', filename])

        fs.unlinkSync(path.join(__dirname, '../uploads/firma-digital/', `${req.body.transferFile}.pdf`) )

        res.status(200).json({
            signedPdf: filename,
            signerCert: certificate,
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res)
        fs.unlinkSync(path.join(__dirname, '../uploads/firma-digital/', `${req.body.transferFile}.pdf`) )
    }
}

//TODO: IMPLEMENT BELLOW FUNCTIONS WITH PKI EXPRESS
RestPKIMiddleware.verifySignature = async (req, res) => {
    try {
        //TODO: implement
        const signatureExplorer = new PadesSignatureExplorer(PKI.getRestPkiClient());

        signatureExplorer.setSignatureFileFromContentBase64(req.file.buffer.toString('base64'));

        signatureExplorer.validate = true;

        signatureExplorer.defaultSignaturePolicyId = StandardSignaturePolicies.PADES_BASIC;
        signatureExplorer.securityContextId = PKI.getSecurityContextId();

        const signature = await signatureExplorer.open();

        res.status(200).json({
            signature
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

RestPKIMiddleware.verifySignatureByCode = async (req, res) => {
    try {

        if (!req.params.codigo)
            throw new Error('Codigo no encontrado')

        const codigo = req.params.codigo

        const resQuerie = await queryHandler("SELECT ruta,nombreArchivo FROM firma_verificar WHERE codigo = ? LIMIT 1", [codigo])

        if (resQuerie.length == 0)
            throw new Error('Codigo no encontrado')

        res.status(200).json({
            ruta: resQuerie[0].ruta,
            filename: resQuerie[0].nombreArchivo
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}



module.exports = RestPKIMiddleware