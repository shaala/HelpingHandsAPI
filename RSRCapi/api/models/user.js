'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    passwordHash: String,
    passwordSalt: String,
    street address: String,
    city: String,
    state: String,
    zip: Number,
    phone-num: Number
});

module.exports = mongoose.model('User', UserSchema);
