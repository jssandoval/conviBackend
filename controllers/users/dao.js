const userModel = require('./model');

module.exports = {
  async createUser(user) {
    // Guardar usuario
    try {
      const userSave = new userModel({ 
          email: user.email, 
          password: user.password, 
          name: user.name 
      });
      await userSave.save();
  
      return userSave;
    } catch (error) {
      return null;      
    }
  },

  async getUserbyEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      return null;      
    }
  },

  async getUserbyId(id) {
    try {
      return await userModel.findById( id );
    } catch (error) {
      return null;
    }
  },

  async getUsers(page, limit) {
    try {
      const [ users, total ] = await Promise.all([
          userModel
              .find({})
              .skip( page )
              .limit( limit ),
  
          userModel.countDocuments()
      ]);
      return { users, total };
    } catch (error) {
      return null      
    }
  },

  async updateUser(id, fields) {
    try {
        return await userModel.findByIdAndUpdate( id, fields, { new: true } );
    } catch (error) {
      return null;
    }
  },

  async deleteUser(id) {
    try {
        return await userModel.findByIdAndDelete( id );
    } catch (error) {
      return null;
    }
  },
};
