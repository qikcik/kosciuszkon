import express from 'express';
const app = express();

import { Database } from 'sqlite-async';
let createScheme = (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, username TEXT UNIQUE)`);
    db.run(`CREATE TABLE IF NOT EXISTS memes (id INTEGER PRIMARY KEY, author_id INTEGER, img BLOB, FOREIGN KEY(author_id) REFERENCES user(id))`);
}

const db = await Database.open('test.db');
createScheme(db);

const getUser = async (token) => {
    try
    {
        if(token)
        {
            let ret = await db.get(`SELECT * FROM user WHERE id = ?`, [token]);
            return ret;
        }
    }
    catch (err)
    {
        console.log(err);
    }
    return null
}



app.use(express.urlencoded({extended: true})) //middleware for parsing urlencoded data
app.use(express.json()) // middleware for parsing incoming json

app.post('/v1/auth/register', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try
    {
        if(username  && password )
        {
            let ret = await db.run(`INSERT INTO user(username) VALUES(?)`, [username]);
            console.log(ret);
            res.json({result: 'success',token: ret.lastID});
            return;
        }
    }
    catch (err)
    {
        console.log(err);
    }
    res.json({result: 'failure'});
})

app.post('/v1/auth', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try
    {
        if(username  && password )
        {
            let ret = await db.get(`SELECT * FROM user WHERE username = ?`, [username]);
            console.log(ret);
            res.json({result: 'success',token: ret.id});
            return;
        }
    }
    catch (err)
    {
        console.log(err);
    }
    res.json({result: 'failure'});
})

app.post("/v1/memes", async (req, res, next) => {
    let token = req.body.token;
    let activeUser = await getUser(token);
    console.log(activeUser);

    if(activeUser)
    {
        res.json({
            result: 'success',
            list: [
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
        ]
        });
        return;
    }
    res.json({result: 'failure'});
});

app.use('/static', express.static('./static'))

app.listen(3000, () => {
    console.log("Server running on port 3000");
});