const bcrypt = require('bcrypt');

const validator = require('validator');

module.exports = exports = function verificationHashPlugin(schema, options) {

  //to validate the email
  schema.path('email').validate(value => {
    return validator.isEmail(value);
  }, '{ VALUE} is not a valid email', 'Invalid Email');

  //to check for valid password
  schema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }
  //to remove the password
  schema.options.toJSON = {
    transform: function (doc, ret, options) {
      delete ret.password
      return ret;
    }
  }

  //to hash the password
  schema.pre('save', function (next) {
    if (this.password) {
      let genSalt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, genSalt);
    }
    this.verificationHash = _.sampleSize(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''), 7
    ).join('');
    next();
  });

  // if there is need to index the 'verificationHash' in future;
  if (options && options.index) {
    schema.path('verificationHash').index(options.index);
  }
};
