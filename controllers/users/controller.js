// const { response } = require('express');
const { response } = require('express');
const bcrypt = require('bcryptjs');

const userDto = require('./dto');
const userDao = require('./dao');
const { generateJWT } = require('../../helpers/jwt');

module.exports = {
  async createUser(req, res = response) {
    const { name, email, password } = req.body;

    try {
        const existeUser = await userDao.getUserbyEmail(email);

        if ( existeUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already registered'
            });
        }

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        const cpassword = bcrypt.hashSync( password, salt );
                
        //llama a Crear el usuario
        // const usuario = userDao.createUser({email, password:cpassword, name} );
        const users = await userDao.createUser({
          email, 
          password:cpassword, 
          name
        });
        if (!users) return res.status(400).json({
            ok: false,
            msg: 'Error in save the user'
        });


        // Generar el TOKEN - JWT
        const token = await generateJWT( users.id );
        const user = userDto.single(users);

        return res.status(200).json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error during account creation'
        });
    }
  },

  async getUsers(req, res = response) {
    const page = parseInt((req.query.page || 0).toString(), 10);
    const limit = parseInt((req.query.limit || 10).toString(), 10);

    const { users, total } = await userDao.getUsers(page, limit);
    if (!users) return res.status(400).json({
                ok: false,
                msg: 'Users not found'
            });

    return res.status(200).json({
            ok: true,
            users: userDto.multiple(users, req.user),
            total
    });
  },

  async getUser(req, res) {
    const uid = req.params.uid;
    if (!uid) return res.status(400).json({
                ok: false,
                msg: 'user ID is not valid'
            });

    const user = await userDao.getUserbyId(uid);
    if (!user) return res.status(400).json({
                ok: false,
                msg: 'User not found'
            });

    return res.status(200).json({
            ok: true,
            users: userDto.single(user)
    });
  },

  async updateUser(req, res) {
    const { name, email, code, phone, status } = req.body;
    const uid = req.params.uid;
    if (!uid) return res.status(400).json({
                ok: false,
                msg: 'user ID is not valid'
            });

    try {
      const user = await userDao.getUserbyId(uid);
      if (!user) return res.status(400).json({
                  ok: false,
                  msg: 'User not found'
              });
  
      if ( user.email !== email ) {
          const existEmail = await userDao.getUserbyEmail( email );
          if ( existEmail ) {
              return res.status(400).json({
                  ok: false,
                  msg: 'Email already registered'
              });
          }
      }
  
      const userUpdate = await userDao.updateUser(uid, {
        email,
        name,
        code,
        phone,
        status
      });
  
      res.json({
          ok: true,
          user: userDto.single(userUpdate)
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error during account creation'
        });
    }
  },

  async deleteUser(req, res) {
    const uid = req.params.uid;
    if (!uid) return res.status(400).json({
                ok: false,
                msg: 'user ID is not valid'
            });

    try {
      const user = await userDao.getUserbyId(uid);
      if (!user) return res.status(400).json({
                  ok: false,
                  msg: 'User not found'
              });
    
      const userUpdate = await userDao.deleteUser(uid);
  
      res.json({
          ok: true,
          msg: "User delete"
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error during account creation'
        });
    }
  },
};
