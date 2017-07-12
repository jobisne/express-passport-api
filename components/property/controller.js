const  Property = require('./model')();
const QueryParser = require('../../helpers/query-parser');

module.exports = {
	create: function (req, res) {
    let data = req.body;
    console.log(data);
    console.log(req.user);
    data.landlord = req.user._id;
		Property.create(data).then(property => {
			return res.status(201).json(property);
		}).catch(err => {
			console.log(err);
			return res.status(400).json(err);
		});
	},
  read: function (req,res) {
    QueryParser(req, Property.findById(req.params.id)).where('isDeleted', false).then(property => {
      if(!property) return res.status(404).json({ message: "Property not found"});
      return res.status(200).json(property);
    }).catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
  },
  list: function (req, res) {
    QueryParser(req, Property.find({ isDeleted: false })).then(property => {
      return res.status(200).json(property);
    }).catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
  },
  update: function (req, res) {
    Property.findById(req.params.id).where('isDeleted', false ).then(property => {
      if(!user) return false;
      Object.Keys(req.body).forEach(Key => {
        property[key] = req.body[key];
      });
      return property.save();
    }).then(property => {
      if(!property) return res.status(404).json({ message: 'Property not found'});
      return res.status(200).json(property);
    }).catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
  }
};