import express from 'express';
const app = express();

import { Database } from 'sqlite-async';
let createScheme = (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS meme (id INTEGER PRIMARY KEY, author_id INTEGER, img TEXT UNIQUE, FOREIGN KEY(author_id) REFERENCES user(id))`);
    db.run(`CREATE TABLE IF NOT EXISTS reaction (id INTEGER PRIMARY KEY, reaction TEXT, meme_id INTEGER, user_id INTEGER, FOREIGN KEY(meme_id) REFERENCES meme(id),FOREIGN KEY(user_id) REFERENCES user(id))`);
    db.run(`CREATE TABLE IF NOT EXISTS sent_meme (id INTEGER PRIMARY KEY, meme_id INTEGER, user_id INTEGER, FOREIGN KEY(meme_id) REFERENCES meme(id),FOREIGN KEY(user_id) REFERENCES user(id))`);
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

import bodyParser from 'body-parser';
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


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
    console.log(req.body);

    try
    {
        if(activeUser)
        {
            if(req.body.list)
            {
                for (const x of req.body.list) {
                    let ret = await db.run(`INSERT INTO reaction(meme_id,user_id,reaction) VALUES(?,?,?)`, [x.id,activeUser.id,x.reaction]);
                }
            }

            let ret = await db.all(`SELECT * FROM meme WHERE id NOT IN (SELECT meme_id FROM sent_meme WHERE user_id = ?) LIMIT 3`,[activeUser.id]);
            for (const x of ret) {
                let ret = db.run(`INSERT INTO sent_meme(meme_id,user_id) VALUES(?,?)`, [x.id,activeUser.id]);
                console.log(await ret);
            }
            res.json({result: 'success',list: ret});
            return;
        }
    }
    catch (err)
    {
        console.log(err);
    }
    res.json({result: 'failure'});
});

app.post("/v1/memes/upload", async (req, res, next) => {
    let token = req.body.token;
    let activeUser = await getUser(token);
    console.log(token);

    try {
        console.log(activeUser);
        if (activeUser && req.body.image) {
            let ret = await db.run(`INSERT INTO meme(author_id,img) VALUES(?,?)`, [activeUser.id,req.body.image]);
            console.log(ret);
            res.json({result: 'success'});
            return;
        }
    }
    catch (err)
    {
        console.log(err);
    }
    res.json({result: 'failure'});
});

app.use('/static', express.static('./static'))

app.listen(3000, () => {
    console.log("Server running on port 3000");
});