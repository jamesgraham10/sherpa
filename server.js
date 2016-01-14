'use strict';

require('dotenv').load();

let express    = require('express'),
    morgan     = require('morgan'),
    bodyParser = require('body-parser'),
    uglifyjs   = require('uglify-js');

require('./api/database');

let routerApi = require('./api/routes/index');

let app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }) );

// External Routes
app.use('/api', routerApi);

app.get('/', (req, res) => {
  console.log("Hello!");
  res.end();
});

let portNumber = 3030;
app.listen(portNumber, () => {
  console.log(`Listening on port ${portNumber}`);
});
