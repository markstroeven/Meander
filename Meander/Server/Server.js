/**
 * Created by Mark Stroeven on 11/28/16.
 */
//imports
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const http = require('http');

//global constants
const CLIENT_PAGE_DIR = "../Client/pages";
const CLIENT_JS_DIR = "../Client/javascript";
const CLIENT_LIB_DIR = "../node_modules";
const CLIENT_CSS_DIR = "../Client/css";
const CLIENT_RES_DIR = "../Client/res";

app.use(express.static(path.join(__dirname, CLIENT_PAGE_DIR)));
app.use(express.static(path.join(__dirname, CLIENT_LIB_DIR)));
app.use(express.static(path.join(__dirname, CLIENT_JS_DIR)));
app.use(express.static(path.join(__dirname, CLIENT_RES_DIR)));
app.use(express.static(path.join(__dirname, CLIENT_CSS_DIR)));

app.use(bodyParser.json());
app.use(session({secret: 'ABGEX09183'}));

var server = app.listen(3000, function () {
    console.log('Skeleton application has been started, The application is currently listening on port 3000');
});
