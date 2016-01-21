'use strict';

let mongoose       = require('mongoose'),
    Schema         = mongoose.Schema,
    todosSchema    = require('./todos'),
    missionSchema  = require('./missions'),
    crypto         = require('crypto'),
    jwt            = require('jsonwebtoken');


let userSchema = new Schema({
    email: { type : String, unique : true, required : true },
    name: { type : String },
    gender: { type : String },
    salt: String,
    hash: String,
    todos: [todosSchema],
    todosArchive: [todosSchema],
    mission: [missionSchema],
    missionArchive: [missionSchema]
  });

  userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  };

  userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
  };

  userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };


let User = mongoose.model('User', userSchema);

module.exports = User;
