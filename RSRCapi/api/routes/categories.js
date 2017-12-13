const Category = require('../models/category');
const config = require('../config');

// ROUTES
module.exports = (router) => {
// GET ALL CATEGORIES
    router.get('/categories', (req, res) => {
        Category.find({}, (err, categories) => {
            if (!categories[0]) {
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
// GET ONE CATEGORY
    router.get('/categories/:name', (req, res) => {
        console.log(req.params.name);
        Category.findOne({ categoryName: req.params.name }, (err, category) => {
            if (!category) {
                res.json({ success: false, message: 'Category not found.' });
            } else {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    res.json({ category });
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
    });
// EDIT A CATEGORY
    router.put('/categories/:id', (req, res) => {
        Category.findById(req.params.id, (err, category) => {
            if (!category) {
                res.send('Category not found.');
            } else if (err) {
                res.json({ success: false, message: err });
            } else {
                // Autofill form with existing data, req.body values CANNOT be blank or category will not save
                category.categoryName = req.body.name;
                category.items = req.body.items;
                category.save((err) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        res.json({ success: true, message: 'Category updated!' });
                    }
                });
            }
        });
    });
// DELETE CATEGORY
    router.delete('/categories/:id', (req, res) => {
        Category.findById(req.params.id, (err, category) => {
            if (!category) {
                res.json({ success: false, message: 'Category not found.' });
            } else if (err) {
                res.json({ success: false, message: err });
            } else {
                category.remove((err) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        res.json({ success: true, message: 'Category deleted'});
                    }
                });
            }
        });
    })
    return router;
}