const puppeteer = require('puppeteer')


const generateHtmlToPdf = async (html) => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setContent(html);

    await page.pdf({ path: '.cache/example.pdf', format: 'A4' });

    await browser.close();
}


module.exports = generateHtmlToPdf