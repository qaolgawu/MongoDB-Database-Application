const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (email) => isEmail(email),
          message: ({ value }) => `${value} некорректный, попробуйте использовать другой email`,
        },
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
      avatar: {
        type: String,
        default: '',
      }
  }, { toJSON: { useProtection: true }, toObject: { useProtection: true } });


  userSchema.statics.findUserByCredentials = function (email, password) {
    return this
      .findOne({ email, password})
      .select('+password')
      .then((user) => {
        if (!user) {
          throw new Error('Неправильные почта или пароль');
        }
        return user;
      });
  };

  module.exports = mongoose.model('User', userSchema);