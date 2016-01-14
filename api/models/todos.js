'use strict';

let mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


let todoSchema = new Schema({
    todo: { type: String, required: true }
  });

//let Todo = mongoose.model('Todo', todoSchema);

module.exports = todoSchema;
