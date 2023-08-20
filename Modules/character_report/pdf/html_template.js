module.exports=(character)=>{
    `
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
                            <th>Photos</th>
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
                                <td>${char.photos
                                    .map((photo) => photo)
                                    .join(", ")}</td>
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
}