const express = require('express');
const router = express.Router();
const db = require('../db');

// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************
router.get('/order/:orderid/items/:page',(req,res) => {
  if (req.params.page==0) {
    db.models.Orderitem
      .findAll({
        order:[['createdAt', 'DESC']],
        where:{OrderId:req.params.orderid}
      })
      .then(items => {
        res.send(items);
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
            res.send(items);
          }
        })
  }
});

router.get('/orderitem',(req,res) => {
  const i = db.models.Orderitem.build();
  res.send(i);
});

 router.get('/orderitem/:id',(req,res) => {
   db.models.Orderitem
     .findByPk(
       req.params.id,
       { include: [
           { model: db.models.User}
         ]}
       )
     .then(item => {
       res.send(item);
     })
     .catch(error => {
       res.send(error);
     });
 });

 router.post('/orderitem',(req,res) => {
   db.models.Orderitem
   .create(req.body)
   .then((item) => {
     item.setUser(req.body.UserId);
     db.models.Orderitem
       .findByPk(
         item.id,
         { include: [
             { model: db.models.User}
           ]}
         )
       .then(item => {
         res.send(item);
       })
       .catch(error => {
         res.send(error);
       });
     })
     .catch(error => {
       res.send(error);
    });
 });

 router.put('/orderitem',(req,res) => {
   db.models.Orderitem
     .update(req.body,{where:{id:req.body.id}})
     .then(() => {
       db.models.Orderitem
       .findByPk(req.body.id)
       .then(item => {
         item.setUser(req.body.UserId);
         db.models.Orderitem
           .findByPk(
             item.id,
             { include: [
                 { model: db.models.User},
               ]}
             )
           .then(item => {
             res.send(item);
           })
           .catch(error => {
             res.send(error);
           });
       })
     })
     .catch(error => {
       res.send(error);
     });
 });

 router.delete('/orderitem',(req,res) => {
   db.models.Orderitem
     .findByPk(req.body.id)
     .then(item => {
       item.destroy()
       .then(() => {
         res.send('success');
       });
     })
 });

module.exports = router;
