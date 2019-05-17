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
          User
          .create(req.body)
          .then(user => {
            res.send(user);
          });
        });
      } else {
        res.status(418).send('Username already exists');
      }
    })
  });

router.post('/auth/login',(req,res) => {
  User.findOne({where:{username:req.body.username}})
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send(user);
        } else {
          res.status(418).send('Invalid password');
        }
      } else {
        res.status(418).send('Invalid username');
      }
    })
});

router.get('/users',(req,res) => {
  User
    .findAll({order:[['createdAt', 'DESC']]})
    .then(users => {
      res.send(users);
    })
});

router.delete('/user',(req,res,next) => {
  User
    .findByPk(req.body.id)
    .then(user => {
      user.destroy()
      .then(() => {
        res.send('success');
      });
    })
});

module.exports = router;
