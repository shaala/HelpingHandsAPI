const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Org = require('./org')

const CategorySchema = new Schema({
    categoryName: { type: String, required: true },
    items: { type: Array, required: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Org'},
});

module.exports = mongoose.model('Category', CategorySchema);