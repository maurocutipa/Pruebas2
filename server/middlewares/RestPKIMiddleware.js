const showError = require('../utils/showError')
const httpErrorHandler = require('../utils/httpErrorHandler')
const restpkiConfig = require('../config/restpki')
const fs = require('fs');
const path = require('path');
const { PKI } = require('../utils/pki')
const crypto = require('crypto')
const {
    PadesSignatureStarter,
    PadesSignatureFinisher,
    PadesMeasurementUnits,
    StandardSignaturePolicies,
    PadesSignatureExplorer
} = require('restpki-client');
const { PadesVisualElementsRestPki } = require('../utils/pki/pades-visualization');

const RestPKIMiddleware = {}


RestPKIMiddleware.startSignature = async (req, res) => {
    try {
        // Get an instance of the PadesSignatureStarter class, responsible for
        // receiving the signature elements and start the signature process.
        const signatureStarter = new PadesSignatureStarter(PKI.getRestPkiClient());

        // Set PDF to be signed.
        if (req.typeSign == 'exist')
            signatureStarter.setPdfToSignFromPath(req.file.path)
        else
            signatureStarter.setPdfToSignFromContentBase64(req.file.buffer.toString('base64'))


        // Set the signature policy.
        signatureStarter.signaturePolicy = StandardSignaturePolicies.PADES_BASIC;

        // Set the security context to be used to determine trust in the certificate
        // chain. We have encapsulated the security context choice on util.js.
        signatureStarter.securityContext = PKI.getSecurityContextId();

        // Set the unit of measurements used to edit the PDF marks and visual
        // representations.
        signatureStarter.measurementUnits = PadesMeasurementUnits.CENTIMETERS;

        const visualRepresentation = await PadesVisualElementsRestPki.getVisualRepresentation()

        // Set the visual representation to signatureStarter.
        signatureStarter.visualRepresentation = visualRepresentation;

        // Call the startWithWebPki() method, which initiates the signature.
        // This yields the token, a 43-character case-sensitive URL-safe
        // string, which identifies this signature process. We'll use this
        // value to call the signWithRestPki() method on the WebPKI component
        // (see public/js/signature-form.js) and also to complete the signature
        // after the form is submitted (see post method). This should not be
        // mistaken with the API access token.
        const result = await signatureStarter.startWithWebPki();

        // The token acquired can only be used for a single signature attempt.
        // In order to retry the signature it is necessary to get a new token.
        // This can be a problem if the user uses the back button of the
        // browser, since the browser might show a cached page that we rendered
        // previously, with a now stale token. To prevent this from happening,
        // we set some response headers specifying that the page should not be
        // cached.
        //PKI.setExpiredPage(res);

        // Render the signature page.
        res.status(200).json({
            token: result.token,
        });
    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

RestPKIMiddleware.finishSignature = async (req, res) => {
    try {
        // Get an instance of the PadesSignatureFinisher class, responsible for
        // completing the signature process.
        const signatureFinisher = new PadesSignatureFinisher(PKI.getRestPkiClient());

        // Set the token.
        signatureFinisher.token = req.body.token;


        const result = await signatureFinisher.finish();

        // The "certificate" property of the SignatureResult object contains
        // information about the certificate used by the user to sign the file.
        const signerCert = result.certificate;

        //generate random name
        const filename = crypto.randomBytes(8).toString('hex') + '.pdf'

        //TODO: si se trata de un archivo temporal, eliminarlo
        //TODO: si se trata de un archivo existente, moverlo a la carpeta de firmados
        await result.writeToFile(path.join(__dirname, '../uploads/firma-digital/' + filename));

        res.status(200).json({
            signedPdf: filename,
            signerCert
        })
    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
}

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



module.exports = RestPKIMiddleware