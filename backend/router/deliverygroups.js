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



router.get('/delivery/group',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend DeliveryGroup detail',req.query.detail);
  console.log(' ');
  db.models.DeliveryGroup
    .findByPk(
      req.query.detail,
      { include: [
        { model: db.models.User},
        { model: db.models.Delivery, include: [{model: db.models.Account}, {model: db.models.Account, as: 'Shipto'}]},
      ]}
    )
    .then(group => {
      console.log(' ');
      console.log('=====>>>>> backend deliverygroup findpk include',group);
      console.log(' ');
      res.send(group);
    })
});

// router.post('/delivery/define',(req,res) => {
//   // console.log(' ');
//   // console.log(' ');
//   // console.log('=====>>>>> backend delivery DEFINE',req.body);
//   if (req.body.deliveryProducts) {
//     db.models.DeliveryGroup
//     .create({dg_description: 'Delivery '+new Date().valueOf()})
//     .then(group => {
//       console.log('=====>>>>> group',group.id);
//       req.body.deliveryProducts.forEach((product) => {
//         let residual = product.qty;
//         console.log('=====>>>>> product',product.description,product.qty);
//         db.models.Orderitem.findAll({
//           where: {
//             status: 'NEW',
//             description: product.description
//           },
//           include: [{model: db.models.Order}],
//           order:[['createdAt', 'DESC']]
//         }).then(items => {
//           items.forEach(item => {
//             if (item.qty <= residual) {
//               db.models.Delivery.findOrCreate({
//                 where: {DeliveryGroupId: group.id, AccountId: item.Order.AccountId, ShiptoId: item.Order.ShiptoId},
//                 defaults: {DeliveryGroupId: group.id, AccountId: item.Order.AccountId, ShiptoId: item.Order.ShiptoId}
//               })
//               .then(([delivery, created]) => {
//                 console.log('=====>>>>> ',delivery);
//                 item.DeliveryId = delivery.id;
//                 item.save();
//               });
//               residual -= item.qty;
//               console.log('=====>>>>> item',item.id,item.Order.AccountId,item.Order.ShiptoId,item.qty,residual);
//             }
//           });
//         });
//       });
//     });
//   }
//   res.send('ok');
// });
/*


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
