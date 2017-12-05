'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type:String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    zipCode: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
