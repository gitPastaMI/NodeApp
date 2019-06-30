const express = require('express');
const router = express.Router();
const db = require('../db');

// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************
router.get('/forecast',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend deliverygroups get',req.query,req.url);
  console.log(' ');
  const Sequelize = require('sequelize');
  db.models.Orderitem
  .findAll({
    attributes: ['product_key', [Sequelize.fn('sum', Sequelize.col('qty')), 'total']],
    where: {
      status: 'NEW'
    },
    group : ['product_key'],
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

router.post('/forecast',async (req,res) => {
  let forecast = req.body.forecast;
  const transaction = await db.transaction();
  try {
    let group = await db.models.DeliveryGroup
      .create({
        dg_key: forecast.key,
        // dg_date: Date.now(),
        // dg_status: 'NEW',
        // dg_weight: 0,
        // dg_deliveries: 0,
        UserId: forecast.userid
      },{transaction: transaction});
    console.log(group.id,group.key);
    for (var p = 0; p < forecast.products.length; p++) {
      let product = forecast.products[p];
      console.log('--->>>',product);
      let orderitems = await db.models.Orderitem
        .findAll({
          where: {'product_key':product.key},
          include: [
            { model: db.models.Order}
          ],
          order: [
            ['createdAt'],
            [{model: db.models.Order},'AccountId'],
            [{model: db.models.Order},'ShiptoId'],
            ['qty']
          ],
          transaction: transaction
        });
      console.log('+++++>>>>> orderitems',orderitems.length);
      for (var i = 0; i < orderitems.length; i++) {
        let item = orderitems[i];
        console.log('------>>>>>>',product.key,product.qty,' @ ',item.id,item.qty,item.Order.AccountId,item.Order.ShiptoId,item.total_weight);
        if (product.qty >= item.qty) {
          let delivery = await db.models.Delivery
          .findOrCreate({
            defaults: { 'DeliveryGroupId': group.id},
            where: {'AccountId':item.Order.AccountId, 'ShiptoId':item.Order.ShiptoId},
            transaction: transaction
          });
          delivery = delivery[0];
          console.log('+++++>>>>> delivery',delivery.delivery_weight,item.total_weight);
          delivery.delivery_weight += parseFloat(item.total_weight);
          delivery = await delivery.save({transaction: transaction});
          item.DeliveryId = delivery.id;
          item.status = 'ON DELIVERY';
          item = await item.save({transaction: transaction});
          product.qty -= item.qty;
          if (product.qty ===0) {
            break;
          }
        }
      }
    }

    await transaction.commit();
    // await transaction.rollback();
    res.send('OK');
  } catch (e) {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx',e);
    await transaction.rollback();
    res.json({error: e});
  } finally {
  }
});

router.post('/forecast',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend forecast post',req.query,req.url,req.body);
  console.log(' ');
  const forecast = req.body.forecast;
  const group = db.models.DeliveryGroup
    .build({
      dg_key: forecast.key,
      dg_date: Date.now(),
      dg_status: 'NEW',
      UserId: forecast.userid,
    });
  console.log('=====>>>>> backend forecast group build',group);
  let deliveries = [];
  // forecast.products.forEach(fetchOrderitems;
  for (var p = 0; p < forecast.products.length; p++) {
    let product = forecast.products[p];
    console.log('product',p,product);
    db.models.Orderitem
      .findAll({
        where: {'product_key':product.key},
        include: [
          { model: db.models.Order}
        ],
        order: [
          ['createdAt'],
          [{model: db.models.Order},'AccountId'],
          [{model: db.models.Order},'ShiptoId'],
          ['qty']
        ]
      })
      .then(orderitems => {
        console.log('=====>>>>> backend forecast fetchOrderitems',orderitems.length);
        for (var i = 0; i < orderitems.length; i++) {
          if (product.qty >= orderitems[i].qty) {
            console.log('=====>>>>> key(qty)',product.key+'('+product.qty+')',orderitems[i].id,orderitems[i].qty,orderitems[i].Order.AccountId,orderitems[i].Order.ShiptoId);
            console.log('deliveries',deliveries);
            var delivery = deliveries.filter((item) => {
              return item.accountid === orderitems[i].Order.AccountId &&  item.shiptoid === orderitems[i].Order.ShiptoId;
            });
            console.log('delivery',delivery);
            if (delivery.length === 0) {
              deliveries.push({accountid: orderitems[i].Order.AccountId, shiptoid:orderitems[i].Order.ShiptoId, items: [orderitems[i].id]});
            } else {
              delivery[0].items.push(orderitems[i].id);
            }
            product.qty -= orderitems[i].qty;
          } else {
            console.log('=====>>>>> break');
            break;
          }
        }
      });
  }
});

// router.post('/forecast',(req,res) => {
//   console.log(' ');
//   console.log('=====>>>>> backend forecast post',req.query,req.url,req.body);
//   console.log(' ');
//   db.models.Forecast
//   .destroy({where:{UserId:req.body.forecast[0].UserId}})
//   .then(()=>{
//     db.models.Forecast
//     .bulkCreate(req.body.forecast)
//     .then(() => {
//       console.log(' ');
//       console.log('=====>>>>> backend forecast bulkcreate');
//       console.log(' ');
//       console.log(' ');
//       console.log('=====>>>>> backend forecast USERID',req.body.forecast[0].UserId);
//       console.log('=====>>>>> backend forecast hatkey',req.body.forecast[0].forecast_hatkey);
//       console.log(' ');
//       db
//       .query('CALL finalizeForecast(:UserId,:HatKey)',
//             {replacements: {
//               UserId: req.body.forecast[0].UserId,
//               HatKey: req.body.forecast[0].forecast_hatkey
//             }})
//       //.then(([results, metadata]) => {
//       .then((response) => {
//         // Results will be an empty array and metadata will contain the number of affected rows.
//         console.log(' ');
//         console.log('=====>>>>> backend forecast response',response);
//         console.log(' ');
//         res.send('ok');
//       })
//     })
//   });
// });

module.exports = router;
