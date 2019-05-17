const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../db').User;
// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************

router.post('/auth/register',(req,res) => {
  console.log('backend register 3',req.body);
  User.findOne({where:{username:req.body.username}})
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, saltRounds)
        .then(hash => {
          req.body.password = hash;
          User
          .create(req.body)
          .then(user => {
            console.log('backend register OK 4',req.body);
            res.send(user);
          });
        });
      } else {
        console.log('backend register KO 4',req.body);
        res.send({feedback: {type:'error', message:'Username already exists'}});
      }
    })
    .catch(error => {
      res.send(error);
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
    // .catch(error => {
    //   // res.send(error);
    //   throw error;
    // });
});

router.delete('/user',(req,res) => {
  User
    .findByPk(req.user.id)
    .then(user => {
      user.destroy();
    })
});

module.exports = router;
