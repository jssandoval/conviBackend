// const { response } = require('express');
const { response } = require('express');
const bcrypt = require('bcryptjs');

const userDto = require('../users/dto');
const userDao = require('../users/dao');
const { generateJWT } = require('../../helpers/jwt');

module.exports = {
  async login(req, res = response) {
    const { email, password } = req.body;

    if (!password) return res.sendStatus(400);
    if (!email) return res.sendStatus(400);

    try {
        //que el usuario exista
        const validUser = await userDao.getUserbyEmail(email);

        if ( !validUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email not found'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, validUser.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'The Password is not valid'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generateJWT( validUser.id );
        const user = userDto.single(validUser);

        return res.status(200).json({
            ok: true,
            user,
            token
        });
        //TODO: falta incluir el menu
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error during login'
        });
    }
  },

  async renewToken(req, res = response) {
    const uid = req.uid;

    // console.log(uid);

    //buscamos el usuario por ID
    const validUser = await userDao.getUserbyId(uid);

    if ( !validUser ) {
        return res.status(400).json({
            ok: false,
            msg: 'User UID not found or token is not corret'
        });
    }

    // Generar el TOKEN - JWT
    const token = await generateJWT( uid );
    const user = userDto.single(validUser);

    return res.status(200).json({
        ok: true,
        user,
        token
    });
    //TODO: falta incluir el menu
  },

  // async getUser(req, res) {
  //   const user = await userModel.getUser(req.params.id);
  //   if (!user) return res.sendStatus(404);

  //   return res.send(userDto.single(user, req.user));
  // },

  // async updateUser(req, res) {
  //   if (!req.body.username) return res.sendStatus(400);
  //   if (!req.body.email) return res.sendStatus(400);
  //   const user = await userModel.getUser(req.params.id);
  //   if (!user) return res.sendStatus(404);

  //   await userModel.updateUser(req.params.id, {
  //     username: req.body.username,
  //     email: req.body.email,
  //   });

  //   return res.sendStatus(204);
  // },
  // async deleteUser(req, res) {
  //   await userModel.deleteUser(req.param.id);
  //   res.sendStatus(204);
  // },
};
