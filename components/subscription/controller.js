const  Subscription = require('./model')();


module.exports = {
	create: function (req, res) {
    let data = req.body;
    data.landlord = req.user._id;
		Subscription.create(data).then(subscription => {
			return res.status(201).json(subscription);
		}).catch(err => {
			console.log(err);
			return res.status(400).json(err);
		});
	},
  read: function (req,res) {
    Subscription.findById(req.params.id).where('isDeleted', false).then(subscription => {
      if(!subscription) return res.status(404).json({ message: "Subscription not found"});
      return res.status(200).json(subscription);
    }).catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
  },
  list: function (req, res) {
    Subscription.find({ isDeleted: false }).then(subscription => {
      return res.status(200).json(subscription);
    }).catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
  },
  update: function (req, res) {
    Subscription.findById(req.params.id).where('isDeleted', false ).then(subscription => {
      if(!user) return false;
      Object.Keys(req.body).forEach(Key => {
        subscription[key] = req.body[key];
      });
      return subscription.save();
    }).then(subscription => {
      if(!subscription) return res.status(404).json({ message: 'Subscription not found'});
      return res.status(200).json(subscription);
    }).catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
  }
};