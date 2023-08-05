const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();
const history = require("connect-history-api-fallback")

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', (req, res) => {

    const obj = {
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
        admin: req.body.admin,
        email: req.body.email,
    };

    Users.create(obj).then( rows => {      
        const usr = {
            userId: rows.id,
            user: rows.name
        };
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token: token });
    }).catch( err => {
      res.status(500).json(err)} );
});

app.post('/login', (req, res) => {

    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name
                };
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => {
          res.status(500).json({msg: "No user found."}) 
        });
});

function authSocket(msg, next) {
    console.log("authSocket")
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}

io.on('connection', socket => {
    socket.use(authSocket);

    socket.on('error', err => socket.emit('error', err.message) );
});

server.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});