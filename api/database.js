'use strict';

let mongoose     = require('mongoose'),
    dbLocal      = 'mongodb://localhost/todo',
    dbProduction = 'mongodb://jamesgraham:Peacht0p207@ds045785.mongolab.com:45785/meantodo',
    dbPath;

let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (env === 'development') {
  mongoose.connect(dbLocal);
  dbPath = dbLocal;
} else {
  mongoose.connect(dbProduction);
  dbPath = dbProduction;
}

let db = mongoose.connection;

// Connection events

db.on('connected', () => {
  console.log(`Mongoose connected to: ${dbPath}`);
});

db.on('error', (err) => {
  console.log(`Mongoose error: ${err}`);
});

db.on('disconnected', () => {
  console.log(`Mongoose has disconnected from: ${dbPath}`);
});
