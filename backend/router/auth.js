const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../db').User;
// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************

router.post('/auth/register',(req,res) => {
  User.findOne({where:{username:req.body.username}})
  .then(user => {
    if (!user) {
      bcrypt.hash(req.body.password, saltRounds)
      .then(hash => {
        req.body.password = hash;
      })
      .catch(error => {
        throw error;
      });
      // .then(hash => {
      //
      //   User
      //     .create(req.body)
      //     .then(user => {
      //       res.send(user);
      //     })
      //     .catch(error => {
      //       // res.send(error);
      //       throw error;
      //     });
      //   })
      //   .catch(error => {
      //     throw error;
      //   })
      //  }
    } else {
      throw 'Username already exists.'
    }
  })
  .catch(error => {
    // res.send(error);
    throw error;
  });

});

router.post('/auth/login',(req,res) => {
  const user = req.body;
  res.send(user);
});

router.get('/users',(req,res) => {
  User
    .findAll()
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      // res.send(error);
      throw error;
    });
});

module.exports = router;
