const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../db');
// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************

router.post('/auth/register',(req,res) => {
  db.models.User.findOne({where:{username:req.body.username}})
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, saltRounds)
        .then(hash => {
          req.body.password = hash;
          db.models.User
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
  console.log(' ');
  console.log('=====>>>>> backend auth login post',req.url,req.qyery,req.body);
  console.log(' ');
  db.models.User.findOne({where:{username:req.body.username}})
    .then(user => {
      console.log('=====>>>>> backend auth login user ',user);
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send(user);
        } else {
          console.log('=====>>>>> backend auth login invalid password');
          // res.status(418).send('Invalid password');
          throw new Error('Invalid password');
          // res.send({errors: 'Invalid password'});
        }
      } else {
        console.log('=====>>>>> backend auth login invalid username');
        // res.status(418).send('Invalid username');
        throw new Error('Invalid username');
        // res.send({errors: 'Invalid username'});
      }
    })
});

router.get('/users',(req,res) => {
  db.models.User
    .findAll({order:[['createdAt', 'DESC']]})
    .then(users => {
      res.send(users);
    })
});

router.delete('/user',(req,res,next) => {
  db.models.User
    .findByPk(req.body.id)
    .then(user => {
      user.destroy()
      .then(() => {
        res.send('ok');
      });
    })
});

module.exports = router;
