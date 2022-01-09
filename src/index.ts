import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";

const http = require('http');

createConnection().then(async connection => {
    console.log("Application is started on port 3000");
}).catch(error => console.log("TypeORM connection error: ", error));

const hostname = 'localhost'
const httpPort = 3000;

const app = express();
const httpServer = http.createServer(app);

var cors = require('cors');

var allowedOrigins = [
    'http://localhost:4200'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true,

}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes

httpServer.listen(httpPort, hostname);


