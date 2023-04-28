const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require("cors");
const route = express();
route.use(express.json());
const {sequelize} = require("./models");
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
route.use(cors(corsOptions))
route.use(function(req, res, next) { res.setHeader("Access-Control-Allow-Origin","*"); next(); });


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

route.use("/users", userRoutes);
route.use("/authors", authorRoutes);
route.use("/books", bookRoutes);
route.use("/patrons", patronRoutes);
route.use("/checkouts", checkoutsRoutes);
route.use("/holds", holdsRoutes);
route.use("/waitlists", waitlistsRoutes);
route.use("/notifications", notificationsRoutes);
route.use("/categories", categoriesRoutes);
route.use("/bookcopies", bookcopiesRoutes);
route.use("/bookauthors", bookauthorsRoutes);

route.listen({ port: 8080 }, async () => {
    await sequelize.authenticate();
});