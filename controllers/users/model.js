const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true,
  },
  name: {
      type: String,
      required: true
  },
  code: {
      type: String
  },
  image: {
      type: String,
  },
  phone: {
      type: String,
  },
  google: {
      type: Boolean,
      default: false
  },
  status: {
      type: Boolean,
      default: true
  },
  created: {
      type: Date,
      default: Date.now
  },
});


UserSchema.method('toJSON', function() {
    const { __v, _id, password, status, created, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model( 'User', UserSchema );
// module.exports = {

//   async getUsers(page, limit) {
//     return userDao.getUsers(page, limit);
//   },

//   async getUser(id) {
//     return userDao.getUser(id);
//   },

//   async createUser(user) {
//     return userDao.createUser(user);
//   },

//   async updateUser(id, { email, username }) {
//     return userDao.updateUser(id, { email, username });
//   },

//   async deleteUser(id) {
//     return userDao.updateUser(id);
//   },
// };
