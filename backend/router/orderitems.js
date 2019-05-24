const express = require('express');
const router = express.Router();
const db = require('../db');

// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************
router.get('/order/:orderid/items/:page',(req,res) => {
  console.log('orderitems',req.params);
  if (req.params.page==0) {
    db.models.Orderitem
      .findAndCountAll({
        order:[['createdAt', 'DESC']],
        where:{OrderId:req.params.orderid}
      })
      .then(item => {
        if (items.count===0) {
          res.status(418).send('No items found');
        } else {
          res.send(items.rows);
        }
      })
  } else {
    const PAGESIZE = 10;
    db.models.Orderitem
      .findAll({
        order:[['createdAt', 'DESC']],
        offset: (req.params.page -1) * PAGESIZE,
        limit: ((req.params.page -1) * PAGESIZE) + PAGESIZE,
      })
      .then(items => {
          if (items.length===0) {
            res.status(418).send('No items found');
          } else {
            res.send(items  );
          }
        })
  }
});

router.get('/order/item',(req,res) => {
  res.send(db.models.Orderitem.build());
});
//
// router.get('/order/:id',(req,res) => {
//   db.models.Order
//     .findByPk(
//       req.params.id,
//       { include: [
//           { model: db.models.User},
//           { model: db.models.Account},
//           { model: db.models.Account, as: 'Shipto' },
//           { model: db.models.Account, as: 'Billto' },
//           { model: db.models.Orderitem},
//         ]}
//       )
//     .then(order => {
//       res.send(order);
//     })
//     .catch(error => {
//       res.send(error);
//     });
// });
//
// router.post('/order',(req,res) => {
//   db.models.Order
//   .create(req.body)
//   .then((order) => {
//     order.setUser(req.body.UserId);
//     order.setAccount(req.body.AccountId);
//     order.setShipto(req.body.ShiptoId);
//     order.setBillto(req.body.BilltoId);
//     // res.send(order);
//     db.models.Order
//       .findByPk(
//         order.id,
//         { include: [
//             { model: db.models.User},
//             { model: db.models.Account},
//             { model: db.models.Account, as: 'Shipto' },
//             { model: db.models.Account, as: 'Billto' },
//             { model: db.models.Orderitem},
//           ]}
//         )
//       .then(order => {
//         res.send(order);
//       })
//       .catch(error => {
//         res.send(error);
//       });
//   })
//   .catch(error => {
//     res.send(error);
//   });
// });
//
// router.put('/order',(req,res) => {
//   db.models.Order
//     .update(req.body,{where:{id:req.body.id}})
//     .then(() => {
//       db.models.Order
//       .findByPk(req.body.id)
//       .then(order => {
//         order.setUser(req.body.UserId);
//         order.setAccount(req.body.AccountId);
//         order.setShipto(req.body.ShiptoId);
//         order.setBillto(req.body.BilltoId);
//         // order.save();
//         // res.send(order);
//         db.models.Order
//           .findByPk(
//             order.id,
//             { include: [
//                 { model: db.models.User},
//                 { model: db.models.Account},
//                 { model: db.models.Account, as: 'Shipto' },
//                 { model: db.models.Account, as: 'Billto' },
//                 { model: db.models.Orderitem},
//               ]}
//             )
//           .then(order => {
//             res.send(order);
//           })
//           .catch(error => {
//             res.send(error);
//           });
//       })
//     })
//     .catch(error => {
//       res.send(error);
//     });
// });
//
// router.delete('/order',(req,res) => {
//   db.models.Order
//     .findByPk(req.body.id)
//     .then(order => {
//       order.destroy()
//       .then(() => {
//         res.send('success');
//       });
//     })
// });

module.exports = router;
