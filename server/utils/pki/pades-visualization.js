const { PadesVisualPositioningPresets } = require('restpki-client');
const { PKI } = require('./');
const dayjs = require('dayjs')
const QRcode = require('qrcode')
const fs = require('fs')
const path = require('path')

class PadesVisualElementsRestPki {
    static async getVisualRepresentation() {
        try {
            const codigo = PKI.generateVerificationCode()
            const url = process.env.SERVER_NAME + '/verificar/' + codigo

            //generar codigo qr con url a un buffer luego convertirlo a base64
            const qrcode = (await QRcode.toBuffer(url)).toString('base64')

            const visualRepresentation = {
                text: {

                    // For a full list of the supported tags, see:
                    // https://docs.lacunasoftware.com/articles/rest-pki/pades-tags.html
                    text: 'Firmado Digitalmente por {{signerName}}' +
                        '\nFecha y Hora: ' + dayjs(Date.now()).format('DD/MM/YYYY HH:mm') +
                        '\nVerificador: ' + codigo +
                        '\nEste documento esta firmado digitalmente conforme los' +
                        '\ntérminos de la Ley 25.506. La presente firma podrá' +
                        '\nverificarse y/o validarse en www.mpajujuy.gob.ar/pki ',
                    fontSize: 6,
                    // Specify that the signing time should also be rendered.
                    includeSigningTime: false,
                    // Optionally set the horizontal alignment of the text ('Left' or
                    // 'Right'), if not set the default is 'Left'.
                    horizontalAlign: 'Left',
                    // Optionally set the container within the signature rectangle on
                    // which to place the text. By default, the text can occupy the
                    // entire rectangle (how much of the rectangle the text will actually
                    // fill depends on the length and font size). Below, we specify that
                    // the text should respect a right margin of 1.5 cm.
                    container: {
                        left: 0.2,
                        top: 0.2,
                        right: 0.2,
                        bottom: 0.2,
                        width: null,
                        height: null
                    },
                },
                image: {

                    // We'll use as background the image content/PdfStamp.png
                    resource: {
                        content: qrcode, // Base-64 encoded!
                        mimeType: 'image/png',
                    },

                    // Align the image to the right horizontally.
                    horizontalAlign: 'Right',
                    // Align the image to the center vertically.
                },
                'position': {
                    'pageNumber': -1,
                    'measurementUnits': null,
                    'pageOptimization': null,
                    'auto': {
                        'container': {
                            'left': 1.5,
                            'top': null,
                            'right': 5,
                            'bottom': -2,
                            'width': null,
                            'height': 4.94,
                        },
                        'signatureRectangleSize': {
                            'height': 1.8,
                            'width': 7.2
                        },
                        'rowSpacing': 0
                    },
                    'manual': null
                }
            };

            /* let visualPositioning = await PadesVisualPositioningPresets.getFootnote(PKI.getRestPkiClient())
    
            visualPositioning.auto.container.height = 4.94;
            visualPositioning.auto.signatureRectangleSize.width = 8.0;
            visualPositioning.auto.signatureRectangleSize.height = 4.94;
    
            // Add position to visual representation.
            visualRepresentation.position = visualPositioning; */

            return visualRepresentation
        } catch (error) {
            console.log(error);
            return error
        }
    }
}

exports.PadesVisualElementsRestPki = PadesVisualElementsRestPki;
