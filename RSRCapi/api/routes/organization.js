var Org = require('../models/org');
//const router = require('express').Router();
const config = require('../config');
//organization route
module.exports = (router) => {
    router.post('/organization', (req, res) => {
        console.log('organization working');
        var org = new Org();
        org.name = req.body.name;
        org.password = req.body.password;
        org.email = req.body.email;
        org.address = req.body.address;
        org.city = req.body.city;
        org.state = req.body.state;
        org.zipCode = req.body.zipCode;
        org.phone = req.body.phone;
        org.taxIdNumber = req.body.taxIdNumber;
    
        //save org and err check
        org.save(function(err, org) {
          if (err)
              res.send(err);
    
          res.json({ message: 'organization created!'});
        });
        
    });

    
return router;

}


 
