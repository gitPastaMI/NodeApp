const express = require('express');
const router = express.Router();
const Order = require('../db').Order;
// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************

router.get('/orders',(req,res) => {
  Order
    .findAndCountAll({order:[['createdAt', 'DESC']]})
    .then(orders => {
      if (orders.count===0) {
        res.status(418).send('No orders found');
      } else {
        res.send(orders.rows);
      }
    })
});

router.get('/order',(req,res) => {
  res.send(Order.build());
});

router.get('/order/:id',(req,res) => {
  Order
  .findByPk(req.params.id)
  .then(order => {
    res.send(order);
  })
  .catch(error => {
    res.send(error);
  });
});

router.post('/order',(req,res) => {
  console.log('***************************************');
  console.log(req.body.order);
  console.log('***************************************');
  console.log(req.body.user);
  console.log('***************************************');
  Order
    .create(req.body.order)
    .then(order => {
      console.log('++++++++++++++++++++++++++++++++++++++++');
      console.log(order);
      console.log('++++++++++++++++++++++++++++++++++++++++');
      order.setUser(req.body.user);
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      console.log(order);
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      res.send(order);
    })
  .catch(error => {
    res.send(error);
  });
});

router.put('/order',(req,res) => {
  Order
    .update(req.body,{where:{id:req.body.id}})
    .then(() => {
      Order
      .findByPk(req.body.id)
      .then(order => {
        res.send(order);
      })
    })
});

router.delete('/order',(req,res,next) => {
  Order
    .findByPk(req.body.id)
    .then(order => {
      order.destroy()
      .then(() => {
        res.send('success');
      });
    })
});

module.exports = router;
