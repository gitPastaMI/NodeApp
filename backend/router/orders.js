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
  const order = Order.build();
  res.send(order);
});

router.post('/order',(req,res) => {
  Order
    .create(req.body)
    .then(order => {
      res.send(order);
    });
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
