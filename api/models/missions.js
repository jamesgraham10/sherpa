'use strict';

let mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;


let missionSchema = new Schema({
  mission: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedAt : { type: Date },
  archivedAt: { type: Date},
  abandoned: { type: Boolean, default: false},
  abandonedAt: { type: Date },
  todos: [ObjectId]
});

module.exports = missionSchema;
