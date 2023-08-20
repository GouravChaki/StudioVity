const puppeteer = require("puppeteer");
const html_template = require("./html_template");
module.exports = async (character) => {
    try {
        //pupeeteer launches to the browser
        const browser = await puppeteer.launch({ headless: "new" });

        //a new page is created
        const page = await browser.newPage();

        // pdf format to be generated in simple html content
        const pdfContent = html_template(character)

        // to set the html content of the page
        await page.setContent(pdfContent);

        // now pdf would be generated from this page
        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "1cm", bottom: "1cm" },
        });

        await browser.close();

        return pdf;

    } catch (error) {
        console.log(error, "hello");
    }
};
