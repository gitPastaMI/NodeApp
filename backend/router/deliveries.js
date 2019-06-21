const express = require('express');
const router = express.Router();
const db = require('../db');

// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************

router.get('/delivery',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend delivery get',req.query,req.url);
  console.log(' ');
  console.log(' ');
  console.log('=====>>>>> backend delivery detail',req.query.detail);
  console.log(' ');
  db.models.Delivery
    .findByPk(
      req.query.detail,
      { include: [
        { model: db.models.User},
        { model: db.models.Orderitem}
      ]}
    )
    .then(delivery => {
      console.log(' ');
      console.log('=====>>>>> backend delivery findpk include',delivery);
      console.log(' ');
      res.send(delivery);
    })
});

module.exports = router;
