const { Router } = require('express');
const showError = require('../utils/showError')
const httpErrorHandler = require('../utils/httpErrorHandler')
const client = require('../config/restpki-client')
const restPki = require('../config/lacuna-restpki')
const request = require('request');

const router = Router();


router.post('/firmarUpload', /* INCLUIR MULTER MIDDLEWARE, */ async (req, res) => {
    try {

    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
})

router.post('/firmarExist', /* INCLUIR MULTER MIDDLEWARE, */ async (req, res) => {
    try {
        var pdfToSignContent = fs.readFileSync('./public/SampleDocument.pdf');

        // Read the contents of the PDF stamp image
        var pdfStampContent = fs.readFileSync('./resources/PdfStamp.png');

        // Request to be sent to REST PKI
        var restRequest = {

            // Base64-encoding of the PDF to be signed
            pdfToSign: new Buffer(pdfToSignContent).toString('base64'),

            // Signature policy (the ID below corresponds to the PAdES basic policy)
            signaturePolicyId: restPki.standardSignaturePolicies.padesBes,

            // Set a SecurityContext to be used to determine trust in the certificate chain
            securityContextId: restPki.standardSecurityContexts.pkiBrazil,
            // Note: By changing the value above you can accept only certificates from a certain PKI, or
            // from a custom PKI configured on the REST PKI website.

            // Set the visual representation for the signature	
            visualRepresentation: {

                image: {

                    // We'll use as background the image previously loaded
                    resource: {
                        content: new Buffer(pdfStampContent).toString('base64'), // Base64-encoding!
                        mimeType: 'image/png'
                    },

                    // (optional) Opacity is an integer from 0 to 100 (0 is completely transparent, 100 is completely opaque). If omitted, 100 is assumed.
                    opacity: 50,

                    // (optional) Specify the image horizontal alignment. Possible values are 'Left', 'Center' and 'Right'. If omitted, 'Center' is assumed.
                    horizontalAlign: 'Right',

                    // (optional) Specify the image vertical alignment. Possible values are 'Top', 'Center' and 'Bottom'. If omitted, 'Center' is assumed.
                    verticalAlign: 'Center'

                },

                text: {
				
                    // The tags {{signerName}} and {{signerNationalId}} will be substituted according to the user's certificate
                    // signerName -> full name of the signer
                    // signerNationalId -> if the certificate is ICP-Brasil, contains the signer's CPF
                    //text: 'Signed by {{signerName}} ({{signerNationalId}})',
                    
                    'fontSize': 6,
                        'text': 'Firmado Digitalmente por  {{signerName}}' +
                        '\nFecha y Hora: '+ Date.now().toString() +
                        '\nVerificador: ' + ' TEST '+
                        '\nEste documento esta firmado digitalmente conforme los'+
                        'términos de la Ley 25.506. La presente firma podrá'+
                        'verificarse y/o validarse en www.mpajujuy.gob.ar/pki ',
                        // text' => "Firmado por {{name}} ({{br_cpf_formatted}})",
                        'includeSigningTime' : false,
                        'horizontalAlign' : 'Left',
                        'container' : {
                            // 'left' => 0.2,
                            // 'top' => 0.2,
                            // 'right' => 0.2,
                            // 'bottom' => 0.2,
                            'left' : 0.2,
                            'top' : 0.2,
                            'right' : 0.2,
                            'bottom' : 0.2,
                            'width' : null,
                            'height' : null
                        }
                    
                },

                position: {

                    // Page on which to draw the visual representation. Negative values are counted from the end of the document (-1 is last page).
                    // Zero means the signature will be placed on a new page appended to the end of the document.
                    pageNumber: -1,

                    // Measurement units of the values below ('Centimeters' or 'PdfPoints')
                    measurementUnits: "Centimeters",

                    // Automatic placing of signatures within a container, one after the other
                    auto: {

                        // Specification of the container where the signatures will be placed
                        container: {
                            // Specifying left and right (but no width) results in a variable-width container with the given margins
                            left: 1.5,
                            right: 1.5,
                            // Specifying bottom and height (but no top) results in a bottom-aligned fixed-height container
                            bottom: 1.5,
                            height: 3
                        },

                        // Specification of the size of each signature rectangle
                        signatureRectangleSize: {
                            width: 7,
                            height: 3
                        },

                        // The signatures will be placed in the container side by side. If there's no room left, the signatures
                        // will "wrap" to the next row. The value below specifies the vertical distance between rows
                        rowSpacing: 1.5
                    }
                }
            }
        };

        // Call the action POST Api/PadesSignatures on REST PKI, which initiates the signature. 
        request.post(client.endpoint + 'Api/PadesSignatures', {

            json: true,
            headers: { 'Authorization': 'Bearer ' + client.accessToken },
            body: restRequest

        }, function (err, restRes, body) {

            if (restPki.checkResponse(err, restRes, body, next)) {

                // This operation yields the token, a 43-character case-sensitive URL-safe string, which identifies this signature process.
                // We'll use this value to call the signWithRestPki() method on the Web PKI component (see view 'pades-signature') and also
                // to complete the signature after the form is submitted. This should not be mistaken with the API access token.
                var token = restRes.body.token;

                // Send the token in the response
                res.send(token);
            }
        });
    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
})

// Pades Signature Complete
router.post('/completePadesSignature', function (req, res, next) {
    try {
        // Retrieve the token from the URL
        var token = req.body.token;

        // Call the action POST Api/PadesSignatures/{token}/Finalize on REST PKI, which finalizes the signature process and returns the signed PDF
        request.post(client.endpoint + 'Api/PadesSignatures/' + token + '/Finalize', {

            json: true,
            headers: { 'Authorization': 'Bearer ' + client.accessToken }

        }, function (err, restRes, body) {

            if (restPki.checkResponse(err, restRes, body, next)) {

                var signedPdfContent = new Buffer(restRes.body.signedPdf, 'base64');

                // At this point, you'd typically store the signed PDF on your database. For demonstration purposes, we'll
                // store the PDF on a temporary folder publicly accessible and render a link to it.
                var filename = uuid.v4() + '.pdf';
                var appDataPath = './public/app-data/';
                if (!fs.existsSync(appDataPath)) {
                    fs.mkdirSync(appDataPath);
                }
                fs.writeFileSync(appDataPath + filename, signedPdfContent);
                res.send({
                    signedFileName: filename,
                    signerCert: restRes.body.certificate
                });
            }
        });
    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
});

// ---------------------------------------------------------------------------------------------------------
// Authentication

router.get('/authenticationStart', function (req, res, next) {

    try {
        // Set a SecurityContext to be used to determine trust in the certificate chain for the authentication
        var securityContextId = restPki.standardSecurityContexts.test;

        request.post(client.endpoint + 'Api/Authentications', {

            json: true,
            headers: { 'Authorization': 'Bearer ' + client.accessToken },
            body: { securityContextId: securityContextId }

        }, function (err, restRes, body) {
            if (restPki.checkResponse(err, restRes, body, next)) {
                var token = restRes.body.token;
                // Send the response with token
                res.send(token);
            }
        });
    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
});

router.post('/completeAuthentication', function (req, res, next) {
    try {
        request.post(client.endpoint + 'Api/Authentications/' + req.body.token + '/Finalize', {
            json: true,
            headers: { 'Authorization': 'Bearer ' + client.accessToken }

        }, function (err, restRes, body) {
            var response = null;
            if (restPki.checkResponse(err, restRes, body, next)) {

                if (restRes.body.validationResults.errors.length > 0) {
                    response = {
                        success: false,
                        validationResults: restRes.body.validationResults
                    };
                } else {
                    response = {
                        success: true,
                        certificate: restRes.body.certificate
                    };
                }
                res.send(response);
            }
        });
    } catch (error) {
        showError(error)
        httpErrorHandler(res)
    }
});


module.exports = router