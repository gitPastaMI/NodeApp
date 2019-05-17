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
        // res.send({feedback: {type:'error', message:'Username already exists'}});
        res.status(418).send('Username already exists');
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
    .findAll({order:[['createdAt', 'DESC']]})
    .then(users => {
      res.send(users);
    })
    // .catch(error => {
    //   // res.send(error);
    //   throw error;
    // });
});

router.delete('/user',(req,res,next) => {
  console.log('backend delete 3',req.body);
  User
    .findByPk(req.body.id)
    .then(user => {
      console.log('backend delete 3B',user.id);
      user.destroy()
      .then(() => {
        console.log('backend destroy 4',);
        res.send('success');
      });
    })
});

module.exports = router;
