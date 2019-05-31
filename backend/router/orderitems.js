const express = require('express');
const router = express.Router();
const db = require('../db');

// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************

router.get('/items',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend orderitems get',req.query,req.url);
  console.log(' ');
  db.models.Orderitem
    .findAll({
      order: [['createdAt', 'DESC']],
      where: {OrderId: req.query.parent}
    })
    .then(items => {
      res.send(items);
    })
});

router.get('/item',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend item get',req.query,req.url);
  console.log(' ');
  if (req.query.detail) {
    console.log(' ');
    console.log('=====>>>>> backend item detail',req.query.detail);
    console.log(' ');
    db.models.Orderitem
      .findByPk(
        req.query.detail,
        { include: [
          { model: db.models.User}
        ]}
      )
      .then(item => {
        console.log(' ');
        console.log('=====>>>>> backend item findpk include',item);
        console.log(' ');
        res.send(item);
      })
  } else {
    console.log(' ');
    console.log('=====>>>>> backend item build');
    console.log(' ');
    res.send(db.models.Orderitem.build());
  }
});

router.post('/item',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend item post',req.query,req.url,req.body);
  console.log(' ');
  db.models.Orderitem
  .create(req.body)
  .then((item) => {
    console.log(' ');
    console.log('=====>>>>> backend item create',item);
    console.log(' ');
    db.models.Orderitem
      .findByPk(
        item.id,
        { include: [
          { model: db.models.User}
        ]}
      )
      .then(item => {
        console.log(' ');
        console.log('=====>>>>> backend item findpk include',item);
        console.log(' ');
        res.send(item);
      })
  })
});

router.put('/item',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend item put',req.query,req.url,req.body);
  console.log(' ');
  db.models.Orderitem
    .update(req.body,{where:{id:req.body.id}})
    .then(() => {
      db.models.Orderitem
        .findByPk(
          req.body.id,
          { include: [
            { model: db.models.User}
          ]}
        )
        .then(item => {
          console.log(' ');
          console.log('=====>>>>> backend item findpk include',item);
          console.log(' ');
          res.send(item);
        })
    })
});

router.delete('/item',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend item delete',req.query,req.url,req.body);
  console.log(' ');
  db.models.Orderitem
    .findByPk(req.body.id)
    .then(item => {
      console.log(' ');
      console.log('=====>>>>> backend item delete findpk',item);
      console.log(' ');
      item.destroy()
      .then(() => {
        console.log(' ');
        console.log('=====>>>>> backend item destroy',item);
        console.log(' ');
        res.send('OK');
      });
    })
});

module.exports = router;
