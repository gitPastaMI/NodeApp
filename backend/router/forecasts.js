const express = require('express');
const router = express.Router();
const db = require('../db');

// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************


router.post('/forecast',(req,res) => {
  console.log(' ');
  console.log('=====>>>>> backend forecast post',req.query,req.url,req.body);
  console.log(' ');
  db.models.Forecast
  .bulkCreate(req.body.forecast)
  .then(() => {
    console.log(' ');
    console.log('=====>>>>> backend forecast bulkcreate');
    console.log(' ');
    console.log(' ');
    console.log('=====>>>>> backend forecast USERID',req.body.forecast[0].forecast_hatkey);
    console.log(' ');
    db
    .query('CALL finalizeForecast(:UserId,:HatKey)',{replacements: {UserID: req.body.forecast[0].UserId, HatKey: req.body.forecast[0].forecast_hatkey}})
    .then(([results, metadata]) => {
      // Results will be an empty array and metadata will contain the number of affected rows.
      console.log(' ');
      console.log('=====>>>>> backend forecast CALL',results,metadata);
      console.log(' ');
      res.send('Ok');
    })
  })
});

module.exports = router;
