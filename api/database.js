'use strict';

let mongoose     = require('mongoose'),
    dbLocal      = 'mongodb://localhost/todo',
    dbProduction = process.env.MONGOLAB_URI,
    dbPath;

process.env.NODE_ENV === 'production' ? dbPath = dbProduction : dbPath = dbLocal;

mongoose.connect(dbPath);

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
