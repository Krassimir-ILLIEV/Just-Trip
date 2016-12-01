/* globals module require */
"use strict";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

module.exports = function ({ data }) {
    const app = express();
    const rootPath = path.join(__dirname, "/../../");

    app.set("view engine", "pug");
    app.set("views", path.join(rootPath, "server/views/"));
    app.use(express.static(path.join(rootPath, "public")));
    //app.use("/static", express.static("../../public"));

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({ secret: "purple unicorn" }));

    require("./passport")({ app, data });

    return app;
};