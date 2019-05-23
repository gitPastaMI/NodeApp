const express = require('express');
const router = express.Router();
const db = require('../db');

// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************

router.get('/orders/:page',(req,res) => {
  if (req.params.page==0) {
    db.models.Order
      .findAndCountAll({order:[['createdAt', 'DESC']]})
      .then(orders => {
        if (orders.count===0) {
          res.status(418).send('No orders found');
        } else {
          res.send(orders.rows);
        }
      })
  } else {
    const PAGESIZE = 10;
    db.models.Order
      .findAll({
        order:[['createdAt', 'DESC']],
        offset: (req.params.page -1) * PAGESIZE,
        limit: ((req.params.page -1) * PAGESIZE) + PAGESIZE,
      })
      .then(orders => {
          if (orders.length===0) {
            res.status(418).send('No orders found');
          } else {
            res.send(orders);
          }
        })
  }
});

router.get('/order',(req,res) => {
  res.send(db.models.Order.build());
});

router.get('/order/:id',(req,res) => {
  db.models.Order
    .findByPk(
      req.params.id,
      { include: [
          { model: db.models.User},
          { model: db.models.Account},
          { model: db.models.Account, as: 'Shipto' },
          { model: db.models.Account, as: 'Billto' }
        ]}
      )
    .then(order => {
      res.send(order);
    })
    .catch(error => {
      res.send(error);
    });
});

router.post('/order',(req,res) => {
  console.log('*************************************************post',req.body);
  db.models.Order
  .create(req.body)
  .then((order) => {
    order.setUser(req.body.UserId);
    order.setAccount(req.body.AccountId);
    order.setShipto(req.body.ShiptoId);
    order.setBillto(req.body.Billtoid);
    res.send(order);
  })
  .catch(error => {
    res.send(error);
  });
});

router.put('/order',(req,res) => {
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++put',req.body);
  db.models.Order
    .update(req.body,{where:{id:req.body.id}})
    .then(() => {
      order.setUser(req.body.UserId);
      order.setAccount(req.body.AccountId);
      order.setShipto(req.body.ShiptoId);
      order.setBillto(req.body.Billtoid);
      db.models.Order
      .findByPk(req.body.id)
      .then(order => {
        res.send(order);
      })
    })
    .catch(error => {
      res.send(error);
    });
});

router.delete('/order',(req,res) => {
  db.models.Order
    .findByPk(req.body.id)
    .then(order => {
      order.destroy()
      .then(() => {
        res.send('success');
      });
    })
});

module.exports = router;
