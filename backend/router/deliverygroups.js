const express = require('express');
const router = express.Router();
const db = require('../db');

// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************

router.get('/delivery/groups',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend deliveries get',req.query,req.url);
  console.log(' ');
  const Sequelize = require('sequelize');
  if (req.query.filter) {
    db.models.DeliveryGroup
      .findAll({
        order:[['createdAt', 'DESC']],
        where: {
          UserId: {[Sequelize.Op.eq]: req.query.owner},
          [Sequelize.Op.or]: [
            {dg_num: {[Sequelize.Op.substring]: req.query.filter}},
            {id: {[Sequelize.Op.eq]: req.query.filter}},
          ]
        }
      })
      .then(dgs => {
          res.send(dgs);
      })
  } else {
    db.models.DeliveryGroup
    .findAll({
      order:[['createdAt', 'DESC']],
      where: {
        UserId: {[Sequelize.Op.eq]: req.query.owner}
      }
    })
    .then(dgs => {
      res.send(dgs);
    })
  }
});

router.get('/delivery/extract',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend deliverygroups get',req.query,req.url);
  console.log(' ');
  const Sequelize = require('sequelize');
  db.models.Orderitem
  .findAll({
    attributes: ['description', [Sequelize.fn('sum', Sequelize.col('qty')), 'total']],
    where: {
      status: 'NEW'
    },
    group : ['description'],
    order: Sequelize.literal('total DESC'),
    raw: true,
  })
  .then(items => {
    console.log(' ');
    console.log('=====>>>>> backend deliverygroups FINDALL',items);
    console.log(' ');
    res.send(items);
  });
});

router.post('/delivery/define',(req,res) => {
  console.log(' ');
  console.log(' ');
  console.log('=====>>>>> backend delivery DEFINE',req.query,req.params,req.body);
  if (req.body.deliveryProducts) {
    let group = db.models.DeliveryGroup.build();
    group.dg_description='Delivery '+group.dg_date;
    console.log('=====>>>>> backend delivery group',group.id,group.dg_status,group.dg_date,group.dg_description);
    console.log('=====>>>>> backend delivery QUERY',req.body.deliveryProducts);
    req.body.deliveryProducts.forEach((product) => {
      console.log('=====>>>>> backend delivery each',product.description,product.qty);
      db.models.Orderitem.findAll({
        where: {
          status: 'NEW',
          description: product.description
        },
        include: [{model: db.models.Order}],
        order:[['createdAt', 'DESC']]
      }).then(items => {
        items.forEach(item => {
          console.log('=====>>>>> backend delivery items',item.id,item.Order.AccountId);
        });
      });
    });
  }
  res.send('ok');
});
/*
router.get('/order',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend order get',req.query,req.url);
  console.log(' ');
  if (req.query.detail) {
    console.log(' ');
    console.log('=====>>>>> backend order detail',req.query.detail);
    console.log(' ');
    db.models.Order
      .findByPk(
        req.query.detail,
        { include: [
          { model: db.models.User},
          { model: db.models.Account},
          { model: db.models.Account, as: 'Shipto' },
          { model: db.models.Account, as: 'Billto' },
        ]}
      )
      .then(order => {
        console.log(' ');
        console.log('=====>>>>> backend order findpk include',order);
        console.log(' ');
        res.send(order);
      })
  } else {
    console.log(' ');
    console.log('=====>>>>> backend order build');
    console.log(' ');
    res.send(db.models.Order.build());
  }
});

router.post('/order',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend order post',req.query,req.url,req.body);
  console.log(' ');
  db.models.Order
  .create(req.body)
  .then((order) => {
    console.log(' ');
    console.log('=====>>>>> backend order create',order);
    console.log(' ');
    order.setUser(req.body.UserId);
    order.setAccount(req.body.AccountId);
    order.setShipto(req.body.ShiptoId);
    order.setBillto(req.body.BilltoId);
    console.log(' ');
    console.log('=====>>>>> backend order set',order);
    console.log(' ');
    db.models.Order
      .findByPk(
        order.id,
        { include: [
            { model: db.models.User},
            { model: db.models.Account},
            { model: db.models.Account, as: 'Shipto' },
            { model: db.models.Account, as: 'Billto' },
          ]}
        )
      .then(order => {
        console.log(' ');
        console.log('=====>>>>> backend order findpk include',order);
        console.log(' ');
        res.send(order);
      })
  })
});

router.put('/order',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend order put',req.query,req.url,req.body);
  console.log(' ');
  db.models.Order
    .update(req.body,{where:{id:req.body.id}})
    .then(() => {
      db.models.Order
        .findByPk(req.body.id)
        .then(order => {
          order.setUser(req.body.UserId);
          order.setAccount(req.body.AccountId);
          order.setShipto(req.body.ShiptoId);
          order.setBillto(req.body.BilltoId);
          console.log(' ');
          console.log('=====>>>>> backend order update set',order);
          console.log(' ');
          db.models.Order
            .findByPk(
              order.id,
              { include: [
                  { model: db.models.User},
                  { model: db.models.Account},
                  { model: db.models.Account, as: 'Shipto' },
                  { model: db.models.Account, as: 'Billto' },
                ]}
              )
            .then(order => {
              console.log(' ');
              console.log('=====>>>>> backend order findpk include',order);
              console.log(' ');
              res.send(order);
            })
      })
    })
});

router.delete('/order',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend order delete',req.query,req.url,req.body);
  console.log(' ');
  db.models.Order
    .findByPk(req.body.id)
    .then(order => {
      console.log(' ');
      console.log('=====>>>>> backend order delete findpk',order);
      console.log(' ');
      order.destroy()
      .then(() => {
        console.log(' ');
        console.log('=====>>>>> backend order destroy',order);
        console.log(' ');
        res.send('OK');
      });
    })
});
*/
module.exports = router;
