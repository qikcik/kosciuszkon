const express = require("express");
const app = express();

const mysql = require('mysql');

const con = mysql.createConnection({
    host: "mysql.ct8.pl",
    user: "m13484_mbm",
    password: "#eX0Tqs*PG6$4vOd_h+V+r.7P05Hel"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/v1/memes", (req, res, next) => {
    res.json([
        {
            id: 0,
            url: "https://www.datavail.com/wp-content/uploads/2019/10/Week-4-winner.jpg",
        },
        {
            id: 1,
            url: "https://media.discordapp.net/attachments/902959930548551740/1073622766168854610/RDT_20221118_0140243950117114334951072.jpg",
        },
        {
            id: 2,
            url: "https://cdn.discordapp.com/attachments/805813146345275492/1070328764682207334/328043028_893135768729342_166255618862658111_n.png",
        },
        {
            id: 3,
            url: "https://cdn.discordapp.com/attachments/805813146345275492/1067039030916681788/image-6.png",
        },
    ]);
});



const path = require('path')
app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(3000, () => {
    console.log("Server running on port 3000");
});