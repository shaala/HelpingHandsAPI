const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    categoryName: { type: String },
    items: { type: Object }
});

module.exports = mongoose.model('Category', CategorySchema);