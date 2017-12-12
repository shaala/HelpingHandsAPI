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
    // router.route('/user/login')
    //     .post(this.controller.logon);
        // User.find({}, (err, users) => {
        //     if (!users) {
        //         res.json({ success: false, message: 'No users found.' });
        //     } else {
        //         if (err) {
        //             res.json({ success: false, message: err });
        //         } else {
        //             res.json(users);
        //         }
        //     }
        // }
    return router;
}

// in the front end:
// this.api.put('user/id/${this.user.id}', this.user)
//     .then((res) => {

//     })