const Org = require('../models/org');
const Category = require('../models/category');
const config = require('../config');

module.exports = (router) => {
//create new organization with child categories
  router.post('/organization/signup', (req, res) => {
// Create new organization
    const org = new Org();
    org.email = req.body.email,
    org.name = req.body.name,
    org.password = req.body.password,
    org.address = req.body.address,
    org.city = req.body.city,
    org.state = req.body.state,
    org.zipCode = req.body.zipCode,
    org.phone = req.body.phone,
    org.taxIdNumber = req.body.taxIdNumber
    
// Save organization
    org.save(function (err, org) {
      if (err) {
         res.send(err); 
        }
// Create new categories
      const category = new Category({
        organization: org.name,
        items: [
          { categoryName: "clothes",
            items: [
              { name: "shirts", quantity: 0 }, 
              { name: "pants", quantity: 0 },
              { name: "coats", quantity: 0 },
              { name: "underwear", quantity: 0 },
              { name: "socks", quantity: 0 },
              { name: "shoes", quantity: 0 },
              { name: "suits", quantity: 0 }
            ]}, 
          { categoryName: "baby clothes", 
            items: [
              { name: "coats", quantity: 0 },
              { name: "sleepers", quantity: 0 },
              { name: "pants", quantity: 0 },
              { name: "shirts", quantity: 0 },
              { name: "onesies", quantity: 0 },
              { name: "bibs", quantity: 0 }
            ]}, 
          { categoryName: "baby care", 
            items: [
              { name: "blankets", quantity: 0 },
              { name: "pacifiers", quantity: 0 },
              { name: "bottles", quantity: 0 },
              { name: "formula", quantity: 0 },
              { name: "diapers", quantity: 0 },
              { name: "wipes", quantity: 0 }
            ]}, 
          { categoryName: "personal care", 
            items: [
              { name: "soap", quantity: 0 },
              { name: "lotion", quantity: 0 },
              { name: "shampoo", quantity: 0 },
              { name: "conditioner", quantity: 0 },
              { name: "deoderant", quantity: 0 },
              { name: "toothpaste", quantity: 0 },
              { name: "toothbrushes", quantity: 0 },
              { name: "mouthwash", quantity: 0 },
              { name: "sunscreen", quantity: 0 },
              { name: "razors", quantity: 0 },
              { name: "shavingcream", quantity: 0 }
            ]}, 
          { categoryName: "women clothes", 
            items: [
              { name: "bras", quantity: 0 },
              { name: "skirts", quantity: 0 },
              { name: "dresses", quantity: 0 }
            ]}, 
          { categoryName: "women personal care", 
            items: [
              { name: "feminine hygiene", quantity: 0 },
              { name: "makeup", quantity: 0 }
            ]}
          ]
      });
// Save new categories
      category.save((err) => {
        if (err) {
          return err;
        }
        org.name = org.name,
        org.password = org.password,
        org.email = org.email,
        org.address = org.address,
        org.city = org.city,
        org.state = org.state,
        org.zipCode = org.zipCode,
        org.phone = org.phone,
        org.taxIdNumber = org.taxIdNumber,
        org.categories = category._id
// Update organization with newly created categories' id
        org.save((err) => {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            Org.findById({ id: org._id })
              .populate('categories')
              .exex((err, org) => {
                if (err) {
                  res.send(err);
                }
                res.json(org);
              });
          }
        });
      });
    });


  });
// organization log in
  router.post('/organization/login', (req, res) => {
    Org.findOne({ email: req.body.email })
      .populate('categories')
      .exec((err, org) => {
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
        res.json({ success: false, message: 'No organizations found.' });
      } else {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          res.json(org);
        }
      }
    });
  });
  //get one organization
  router.get('/organization/:_id', (req, res) => {
    Org.findById(req.params._id)
      .populate('categories')
      .exec((err, org) => {
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
            org.taxIdNumber = req.body.taxIdNumber,
            org.categories = req.body.categories
            org.save((err) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                  res.json({org});
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
