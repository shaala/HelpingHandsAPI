const User = require('../models/user');
const config = require('../config');

// ROUTES
module.exports = (router) => {
// GET ALL USERS
    router.get('/users', (req, res) => {
        User.find({}, (err, users) => {
            if (!users) {
                res.json({ success: false, message: 'No users found.' });
            } else {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    res.json({ users });
                }
            }
        });
    });
// LOG IN
    router.post('/users/login', (req, res) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (!user) {
                res.json({ success: false, message: 'User not found.' });
            } else {
                if (user.password !== req.body.password) {
                    res.json({ success: false, message: 'Invalid login credentials.'});
                } else {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        res.json({ success: true, message: 'Logged in!' });
                    }
                }
            }
        });
    });
    return router;
}

// in the front end:
// this.api.put('user/id/${this.user.id}', this.user)
//     .then((res) => {

//     })