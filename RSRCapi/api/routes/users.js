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
// REGISTER NEW USER
    router.post('/users/signup', (req, res) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (user) {
                res.json({ success: false, message: 'User already exists. '});
            } else {
                if (!req.body.email) {
                    res.json({ success: false, message: 'Email is required.'});
                } else {
                    if (!req.body.password) {
                        res.json({ success: false, message: 'Password is required.' });
                    } else {
                        if (!req.body.firstName) {
                            res.json({ success: false, message: 'First name is required.' });
                        } else {
                            if (!req.body.lastName) {
                                res.json({ success: false, message: 'Last name is required.' });
                            } else {
                                if (!req.body.zipCode) {
                                    res.json({ success: false, message: 'Zip code is required.' });
                                } else {
                                    const user = new User({
                                        email: req.body.email,
                                        firstName: req.body.firstName,
                                        lastName: req.body.lastName,
                                        password: req.body.password,
                                        zipCode: req.body.zipCode
                                    });
                                    user.save((err) => {
                                        if (err) {
                                            res.json({ success: false, message: err });
                                        } else {
                                            res.json({ success: true, message: 'User saved!' });
                                        }
                                    });
                                }
                            }
                        }
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