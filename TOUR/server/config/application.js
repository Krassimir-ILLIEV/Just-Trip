/* globals module require */
"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    session = require("express-session");

module.exports = function ({ data }) {
    const app = express();

    app.set("view engine", "pug");
    app.use("/static", express.static("../../public"));

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({ secret: "purple unicorn" }));

    require("./passport")({ app, data });

    return app;
};