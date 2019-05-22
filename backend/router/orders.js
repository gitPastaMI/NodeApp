const express = require('express');
const router = express.Router();
// const Order = require('../db').Order;
const Order = require('../db/order');

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
  const User = require('../db/user');
  Order
    .findByPk(req.params.id,{ include: [ User ] })
    .then(order => {
      res.send(order);
    })
    .catch(error => {
      res.send(error);
    });
});

router.post('/order',(req,res) => {
    Order
    .create(req.body.order)
    .then((order) => {
      order.UserId = req.body.user.id;
      order.save().then(order => {
        res.send(order);
      });
    })
    .catch(error => {
      res.send(error);
    });
  // User.findByPk(req.body.user.id).then(user=>{
  //   Order
  //   .create(req.body.order)
  //   .then((order) => {
  //     order.setUser(user).then((order) => {
  //       res.send(order);
  //     })
  //   })
  //   .catch(error => {
  //     res.send(error);
  //   });
  // });
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
