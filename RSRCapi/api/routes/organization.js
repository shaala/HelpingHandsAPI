const Org = require('../models/org');
const Category = require('../models/category');
const config = require('../config');

module.exports = (router) => {
  //create new organization
  router.post('/organization/signup', (req, res) => {
    console.log('organization working');
    var org = new Org();
    org.email = req.body.email,
    org.name = req.body.name,
    org.password = req.body.password,
    org.address = req.body.address,
    org.city = req.body.city,
    org.state = req.body.state,
    org.zipCode = req.body.zipCode,
    org.phone = req.body.phone,
    org.taxIdNumber = req.body.taxIdNumber,
    org.categories = [
      { categoryName: "clothes",
        items: [
          { shirts: 0 }, 
          { pants: 0 }, 
          { coats: 0 }, 
          { underwear: 0 }, 
          { socks: 0 }, 
          { shoes: 0 }, 
          { suits: 0 }
        ]}, 
      { categoryName: "baby clothes", 
        items: [
          { coats: 0 }, 
          { sleepers: 0 }, 
          { pants: 0 }, 
          { shirts: 0 }, 
          { onesies: 0 }, 
          { bibs: 0 }
        ]}, 
      { categoryName: "baby care", 
        items: [
          { blankets: 0 }, 
          { pacifiers: 0 }, 
          { bottles: 0 }, 
          { formula: 0 }, 
          { diapers: 0 }, 
          { wipes: 0 }
        ]}, 
      { categoryName: "personal care", 
        items: [
          { soap: 0 }, 
          { lotion: 0 }, 
          { shampoo: 0 }, 
          { conditioner: 0 }, 
          { deoderant: 0 }, 
          { toothpaste: 0 }, 
          { toothbrushes: 0 }, 
          { mouthwash: 0 }, 
          { sunscreen: 0 }, 
          { razors: 0 }, 
          { shavingcream: 0 }
        ]}, 
      { categoryName: "women clothes", 
        items: [
          { bras: 0 }, 
          { skirts: 0 }, 
          { dresses: 0 }
        ]}, 
      { categoryName: "women personal care", 
        items: [
          { feminine_hygiene: 0 }, 
          { makeup: 0 }
        ]}
      ]

    //save org and err check
    org.save(function (err, org) {
      if (err) {res.send(err);}
      res.json({org});
    });

  });
// organization log in
  router.post('/organization/login', (req, res) => {
    Org.findOne({ email: req.body.email }, (err, org) => {
      if (!org) {
        res.json({ success: false, message: 'Organization not found.' });
      } else {
        if (org.password !== req.body.password) {
          res.json({ success: false, message: 'Invalid login credentials.' });
        } else {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            res.json({ success: true, org });
          }
        }
      }
    });
  });
//  get all orgs
  router.get('/organization', (req, res) => {

    Org.find({}, (err, org) => {
      if (!org) {
        res.json({
          success: false,
          message: 'No organizations found.'
        });
      } else {
        if (err) {
          res.json({
            success: false,
            message: err
          });
        } else {
          res.json({
            org
          });
        }
      }
    });
  });
  //get one organization
  router.get('/organization/:_id', (req, res) => {
    Org.findById(req.params._id, (err, org) => {
      if (err) {
        res.send(err);
      }
      res.json(org);
    });
  });

  // EDIT an organization
  router.put('/organization/:id', (req, res) => {
    Org.findById(req.params.id, (err, org) => {
        if (!org) {
            res.send('org not found.');
        } else if (err) {
            res.json({ success: false, message: err });
        } else {
            // Autofill form with existing data, req.body values CANNOT be blank or user will not save
            org.name = req.body.name,
            org.password = req.body.password,
            org.email = req.body.email,
            org.address = req.body.address,
            org.city = req.body.city,
            org.state = req.body.state,
            org.zipCode = req.body.zipCode,
            org.phone = req.body.phone,
            org.taxIdNumber = req.body.taxIdNumber
            org.save((err) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    res.json({ success: true, message: 'Organization updated!' });
                }
            });
        }
    });
});
// DELETE A Organization
router.delete('/organization/:id', (req, res) => {
    Org.findById(req.params.id, (err, org) => {
        if (!org) {
            res.send('Organization not found.');
        } else if (err) {
            res.json({ success: false, message: err });
        } else {
            org.remove((err) => {
                if (err) {
                    res.json({ success: false, message: "something went wrong" });
                } else {
                    res.json({ success: true, message: 'Organization deleted.' });
                }
            });
        }
    });
});
  return router;

}
