const puppeteer = require('puppeteer')

const generateHtmlToPdf = async (html) => {
    const browser = await puppeteer.launch({
        headless: "new"
    });

    const page = await browser.newPage();

    await page.setContent(html);

    await page.pdf({ path: '.cache/comprobante.pdf', format: 'A4' });

    await browser.close();

    if(process.env.NODE_ENV !== 'production')
        console.log("PDF GENERADO")
}


module.exports = generateHtmlToPdf