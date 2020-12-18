
let
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    router = require('./routers/router'),
    mongoose = require('mongoose'),
    expressValidator = require("express-validator"),
    path = require('path');

require('dotenv').config()
app.use(cors());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));
app.use('/api', router);
app.use(expressValidator());
app.use(express.static(path.join(__dirname, '../uploads')));


let loadEnvBasedConfig = (env) => {
    config = require('./config/' + env);
    startMongo(config.mongo)

    return app.listen(config.PORT, () => {
        console.log("You are conected to %s environment ", env);
        console.log("Application is listening to PORT %d ...... ", config.PORT);
    })
}

function startMongo(mongoObj) {
    mongoose.connect(mongoObj.url, mongoObj.options);
    mongoose.connection.on("connected", () => {
        console.log("Connected to mongoDb on %s ", mongoObj.url);
    });

    mongoose.connection.on("error", (err) => {

        if (err)
            console.log("Not connected");
    });

}

module.exports = loadEnvBasedConfig;