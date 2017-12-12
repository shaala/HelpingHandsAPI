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
    
        //save org and err check
        org.save(function(err, org) {
          if (err)
              res.send(err);
    
          res.json({ message: 'organization created!'});
        });
        
    });
return router;

};


 
