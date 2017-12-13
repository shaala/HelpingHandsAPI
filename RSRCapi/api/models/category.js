const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Org = require('./org')

const CategorySchema = new Schema({
    // categoryName: { type: String, required: true },
    organization: { type: String },
    items: { type: Array, required: true }
});

module.exports = mongoose.model('Category', CategorySchema);