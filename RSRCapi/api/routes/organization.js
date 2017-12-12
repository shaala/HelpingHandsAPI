var Org = require('../models/org');
const router = require('express').Router();

//organization route
module.exports = (router) => {
    router.post('/organizations', (req, res, next) => {
        console.log('organization working');
        var org = new Org();
        org.name = req.body.name;
        org.password = req.body.password;
    
        //save org and err check
        org.save(function(err) {
          if (err)
              res.send(err);
    
          res.json({ message: 'organization created!'});
        });
        
    });


};


 
