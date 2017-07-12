const  Tenant = require('./model')();


module.exports = {
  create: function (req, res) {
    let data = req.body;
    data.landlord = req.user._id;
    console.log(data);
    console.log(req.user);
    Tenant.create(data).then(tenant => {
      console.log(tenant);
      return res.status(201).json(tenant);
    }).catch(err => {
      console.log(err);
      if (err.code === 11000)
        return res.status(400).json({ meassage: 'Validation error has occured', reason: 'Email Exist'})
      return res.status(400).json(err);
    });
  },
  read: function (req,res) {
    Tenant.findById(req.params.id).where('isDeleted', false).then(tenant => {
      if(!tenant) return res.status(404).json({ message: "Tenant not found"});
      return res.status(200).json(tenant);
    }).catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
  },
  list: function (req, res) {
    Tenant.find({ isDeleted: false }).then(tenant => {
      return res.status(200).json(tenant);
    }).catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
  },
  update: function (req, res) {
    Tenant.findById(req.params.id).where('isDeleted', false ).then(tenant => {
      if(!user) return false;
      Object.Keys(req.body).forEach(Key => {
        tenant[key] = req.body[key];
      });
      return tenant.save();
    }).then(tenant => {
      if(!tenant) return res.status(404).json({ message: 'Tenant not found'});
      return res.status(200).json(tenant);
    }).catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
  }
};