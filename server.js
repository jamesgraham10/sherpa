'use strict';

require('dotenv').load();

let express    = require('express'),
    morgan     = require('morgan'),
    bodyParser = require('body-parser'),
    path       = require('path'),
    passport   = require('passport'),
    uglifyjs   = require('uglify-js');

require('./api/database');
require('./api/config/passport');

let routerApi = require('./api/routes/index');

let app = express();

// View Engine
app.set('views', path.join(__dirname, 'angular', 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }) );


if (process.env.NODE_ENV === 'production') {
  // For production use public
  app.use(express.static(path.join(__dirname, 'public')));
} else {
  // For development (pre-minification) use angular
  app.use(express.static(path.join(__dirname, 'angular')));
}

app.use(passport.initialize());

// Render Angular partials
app.get('/partials/:partial', (req, res) => {
  let partial = req.params.partial;
  res.render(`partials/${partial}`);
});

// External Routess
app.use('/api', routerApi);

// Let Angular take over all other routes
// app.get('/', (req, res) => res.render('index') );
// app.get('*', (req, res) => res.render('index') );

app.all('/*', (req, res) => {
    // Just send the index.html for other files to support HTML5Mode
    res.render('index');
});

let portNumber = process.env.PORT || 3030;

app.listen(portNumber, () => {
  console.log(`Listening on port ${portNumber}`);
});
