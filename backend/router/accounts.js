const express = require('express');
const router = express.Router();
const db = require('../db');

// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************

router.get('/accounts',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend accounts get',req.query,req.url);
  console.log(' ');
  const Sequelize = require('sequelize');
  if (req.query.filter) {
    db.models.Account
      .findAll({
        order:[['createdAt', 'DESC']],
        where: {
          UserId: {[Sequelize.Op.eq]: req.query.owner},
          [Sequelize.Op.or]: [
            {description: {[Sequelize.Op.substring]: req.query.filter}},
            {description: {[Sequelize.Op.substring]: req.query.filter.toUpperCase()}},
            {id: {[Sequelize.Op.eq]: req.query.filter}},
          ]
        }
      })
      .then(accounts => {
          res.send(accounts);
      })
  } else {
    db.models.Account
    .findAll({
      order:[['createdAt', 'DESC']],
      where: {
        UserId: {[Sequelize.Op.eq]: req.query.owner}
      }
    })
    .then(accounts => {
      res.send(accounts);
    })
  }
});

router.get('/account',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend account get',req.query,req.url);
  console.log(' ');
  if (req.query.detail) {
    console.log(' ');
    console.log('=====>>>>> backend account detail',req.query.detail);
    console.log(' ');
    db.models.Account
      .findByPk(
        req.query.detail,
        { include: [
          { model: db.models.User}
        ]}
      )
      .then(account => {
        console.log(' ');
        console.log('=====>>>>> backend account findpk include',account);
        console.log(' ');
        res.send(account);
      })
  } else {
    console.log(' ');
    console.log('=====>>>>> backend account build');
    console.log(' ');
    res.send(db.models.Account.build());
  }
});

router.post('/account',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend account post',req.query,req.url,req.body);
  console.log(' ');
  db.models.Account
  .create(req.body)
  .then((account) => {
    console.log(' ');
    console.log('=====>>>>> backend account create',account);
    console.log(' ');
    db.models.Account
      .findByPk(
        account.id,
        { include: [
          { model: db.models.User}
        ]}
      )
      .then(account => {
        console.log(' ');
        console.log('=====>>>>> backend account findpk include',account);
        console.log(' ');
        res.send(account);
      })
  })
});

router.put('/account',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend account put',req.query,req.url,req.body);
  console.log(' ');
  db.models.Account
    .update(req.body,{where:{id:req.body.id}})
    .then(() => {
      db.models.Account
        .findByPk(
          req.body.id,
          { include: [
            { model: db.models.User}
          ]}
        )
        .then(account => {
          console.log(' ');
          console.log('=====>>>>> backend account findpk include',account);
          console.log(' ');
          res.send(account);
        })
    })
});

router.delete('/account',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend account delete',req.query,req.url,req.body);
  console.log(' ');
  db.models.Account
    .findByPk(req.body.id)
    .then(account => {
      console.log(' ');
      console.log('=====>>>>> backend account delete findpk',account);
      console.log(' ');
      account.destroy()
      .then(() => {
        console.log(' ');
        console.log('=====>>>>> backend account destroy',account);
        console.log(' ');
        res.send('OK');
      });
    })
});

module.exports = router;
