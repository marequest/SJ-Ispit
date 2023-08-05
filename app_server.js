const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require("cors");
const app_server = express();
app_server.use(express.json());
const appController = require("./controllers/app/appController");
const history = require("connect-history-api-fallback");
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
app_server.use(cors(corsOptions));
//
// function getCookies(req) {
//     if (req.headers.cookie == null) return {};
//
//     const rawCookies = req.headers.cookie.split('; ');
//     const parsedCookies = {};
//
//     rawCookies.forEach( rawCookie => {
//         const parsedCookie = rawCookie.split('=');
//         parsedCookies[parsedCookie[0]] = parsedCookie[1];
//     });
//
//     return parsedCookies;
// };
//
// function authToken(req, res, next) {
//     const cookies = getCookies(req);
//     const token = cookies['token'];
//
//     if (token == null) return res.redirect(301, '/login');
//
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.redirect(301, '/login');
//         req.user = user;
//         next();
//     });
// }
//
// app_server.route("/").get(authToken, appController.index);
// app_server.route("/login").get(appController.login);
// app_server.route("/register").get(appController.register);
//
// app_server.use(express.static(path.join(__dirname, './routes/static')));
// app_server.route("/authors").get(appController.authors);
// app_server.route("/books").get(appController.books);
// app_server.route("/users").get(appController.users);
// app_server.route("/patrons").get(appController.patrons);
// app_server.route("/checkouts").get(appController.checkouts);
// app_server.route("/holds").get(appController.holds);
// app_server.route("/waitlists").get(appController.waitlists);
// app_server.route("/notifications").get(appController.notifications);
// app_server.route("/categories").get(appController.categories);
// app_server.route("/bookcopies").get(appController.bookcopies);
// app_server.route("/bookauthors").get(appController.bookauthors);


// app_server.use(express.static(path.join(__dirname, './static')));

const staticMdl = express.static(path.join(__dirname, 'dist'))

app_server.use(staticMdl);
app_server.use(history({ index: '/index.html'}));
app_server.use(staticMdl);

app_server.listen(8000);