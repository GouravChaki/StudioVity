const puppeteer = require("puppeteer");
module.exports = async (character) => {
    try {
        //pupeeteer launches to the browser
        const browser = await puppeteer.launch({ headless: "new" });

        //a new page is created
        const page = await browser.newPage();

        // pdf format to be generated in simple html content
        const pdfContent = `
        <html>
            <head>
            <style>
            h1{
                margin-left:30%;
            }
            table, th, td {
                border: 1px solid black;
            }
            </style>
            </head>
            <body>
                <h1>Character Report</h1>
                <table style="width:100%">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Occupation</th>
                            <th>Relations Linked (IDs)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${character
                .map(
                    (char) => `
                            <tr>
                                <td>${char.name}</td>
                                <td>${char.age}</td>
                                <td>${char.gender}</td>
                                <td>${char.occupation}</td>
                                <td>${char.relations
                            .map((relation) => relation)
                            .join(", ")}</td>
                            </tr>
                        `
                )
                .join("")}
                    </tbody>
                </table>
            </body>
        </html>
    `;

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
