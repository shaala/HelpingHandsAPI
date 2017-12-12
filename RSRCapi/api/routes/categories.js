const Category = require('../models/category');
const config = require('../config');

// ROUTES
module.exports = (router) => {
// GET CATEGORIES
    router.get('/categories', (req, res) => {
        Category.find({}, (err, items) => {
            if (!categories) {
                res.json({ success: false, message: 'No categories found.' });
            } else {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    res.json({ categories });
                }
            }
        });
    });
// ADD CATEGORY
    router.post('/categories/new', (req, res) => {
        const category = new Category({
            categoryName: req.body.name,
            items: req.body.items
        });
        category.save((err) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                res.json({ success: true, message: 'Category saved!' });
            }
        });
    })
    return router;
}