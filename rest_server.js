const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require("cors");
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const history = require("connect-history-api-fallback")

const {sequelize} = require("./models");
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});

app.use(express.json());
app.use(cors(corsOptions))
app.use(function(req, res, next) { res.setHeader("Access-Control-Allow-Origin","*"); next(); });


const userRoutes = require('./routes/user.js');
const authorRoutes = require("./routes/author.js");
const bookRoutes = require('./routes/book.js');
const patronRoutes = require('./routes/patron.js');
const checkoutsRoutes = require('./routes/checkout.js');
const holdsRoutes = require('./routes/hold.js');
const waitlistsRoutes = require('./routes/waitlist.js');
const notificationsRoutes = require('./routes/notification.js');
const categoriesRoutes = require('./routes/category.js');
const bookcopiesRoutes = require('./routes/bookcopy.js');
const bookauthorsRoutes = require('./routes/bookauthor.js');

app.use("/users", userRoutes);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/patrons", patronRoutes);
app.use("/checkouts", checkoutsRoutes);
app.use("/holds", holdsRoutes);
app.use("/waitlists", waitlistsRoutes);
app.use("/notifications", notificationsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/bookcopies", bookcopiesRoutes);
app.use("/bookauthors", bookauthorsRoutes);

const staticMdl = express.static(path.join(__dirname, 'dist'))

app.use(staticMdl);
app.use(history({ index: '/index.html'}));
app.use(staticMdl);

server.listen({ port: 8080 }, async () => {
    await sequelize.authenticate();
});