'use strict';

let mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


let todoSchema = new Schema({
  todo: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  completedAt: { type: Date },
  archivedAt: { type: Date},
  hasMission: { type: Boolean, required: true, default: false},
  mission : { type: String },
  dropped: { type: Boolean, default: false}
}, { timestamps: {} } );

module.exports = todoSchema;
