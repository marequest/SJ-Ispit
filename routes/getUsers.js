const express = require('express');
const { sequelize, Users } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];

    if (token == null) return res.redirect(301, '/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.redirect(301, '/login');
        req.user = user;
        next();
    });
}

route.use(authToken);

route.get('/users', (req, res) => {
    const users = Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

module.exports = route;