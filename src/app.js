const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const config = require('../config/appConfig');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const basicAuth = require('express-basic-auth');

/* JSON BODY PARSER CONFIG */

app.use(bodyParser.json());

/* COOKIES CONFIG */

app.use(cookieParser());

/* COMPRESSION CONFIG */

app.use(compression());

/* CORS CONFIG */

if (config.production) {
  app.use(
    cors({
      origin: 'https://dotrack.vercel.app',
      credentials: true
    })
  );
} else {
  app.use(
    cors({
      origin: 'http://localhost:4200',
      credentials: true
    })
  );
}

/* SWAGGER CONFIG */

const options = {
  definition: { openapi: '3.0.0', info: { title: 'Lonper API', version: '1.0.0' } },
  apis: ['./src/api/routers/*.js', './src/api/index.js']
};

const specs = swaggerJsdoc(options);
const { user, password } = config.swagger;

app.use('/swagger', basicAuth({ users: { [user]: password }, challenge: true }), swaggerUi.serve, (req, res) =>
  res.send(swaggerUi.generateHTML(specs, { customCssUrl: '/swagger-ui.css' }))
);

const api = require('./api');
app.use('/api/v1', api);

module.exports = app;
