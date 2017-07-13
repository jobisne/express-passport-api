const User = require('./model')();
const emailHelper = require('../../helpers/email-helper');



module.exports = {
  create: function (req, res) {
    User.create(req.body).then(user => {
      emailHelper.verifyEmail(user);
      return res.status(201).json(user);
    }).catch(err => {
      console.log(err);
      if (err.code === 11000)
        return res.status(400).json({ meassage: 'Validation error has occured', reason: 'Email Exist'})
      return res.status(400).json(err);
    });
  },
  read: function (req, res) {
    User.findById(req.params.id).then(user => {
      return res.status(200).json(user);
    }).catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
  },
  list: function (req, res) {
    User.find().then(users => {
      return res.status(200).json(users);
    }).catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
  },
  update: function (req, res) {
    User.update({ _id: req.params.id }, req.body).then(user => {
      return res.status(200).json(user);
    }).catch(err => {
      console.log(err);
      return res.status(400).json(err);
    });
  },
  delete: function (req, res) {
    User.findOneAndRemove(req.params.id).then( user => {
      return res.status(200).json({msg: 'user deleted'});
    }).catch( eer => {
      console.log(err);
      return res.status(400).json(err);
    })
  }
};
