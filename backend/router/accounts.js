const express = require('express');
const router = express.Router();
const db = require('../db');

// *****************************************************************************
// http://docs.sequelizejs.com/class/lib/model.js~Model.html
// *****************************************************************************

router.get('/accounts/:page',(req,res) => {
  db.models.Account
  .findAndCountAll({order:[['createdAt', 'DESC']]})
  .then(accounts => {
    if (accounts.count===0) {
      res.status(418).send('No account found');
    } else {
      res.send(accounts.rows);
    }
  })
  .catch(error => {
    res.send(error);
  });
});

router.get('/account',(req,res) => {
  res.send(db.models.Account.build());
});

router.get('/account/:id',(req,res) => {
  db.models.Account
  .findByPk(
    req.params.id,
    { include: [
        { model: db.models.User}
      ]}
    )
    .then(account => {
      res.send(account);
    })
    .catch(error => {
      res.send(error);
    });
});

router.post('/account',(req,res) => {
  db.models.Account
  .create(req.body.account)
  .then((account) => {
    db.models.Account
      .findByPk(account.id)
      .then(account => {
        res.send(account);
      })
      .catch(error => {
        res.send(error);
      });
  })
  .catch(error => {
    res.send(error);
  });
});

router.put('/account',(req,res) => {
  db.models.Account
    .update(req.body,{where:{id:req.body.id}})
    .then(() => {
      db.models.Account
      .findByPk(req.body.id)
      .then(account => {
        res.send(account);
      })
    })
    .catch(error => {
      res.send(error);
    });
});

router.delete('/account',(req,res) => {
  db.models.Account
    .findByPk(req.body.id)
    .then(account => {
      account.destroy()
      .then(() => {
        res.send('success');
      });
    })
    .catch(error => {
      res.send(error);
    });
});

router.get('/account/f/:filter',(req,res)=>{
  const Sequelize = require('sequelize');
  db.models.Account
    .findAll({
    where: {
      [Sequelize.Op.or]: [
        {description: {[Sequelize.Op.substring]: req.params.filter}},
        {description: {[Sequelize.Op.substring]: req.params.filter.toUpperCase()}},
        {id: {[Sequelize.Op.eq]: req.params.filter}},
      ]
    }
  })
  .then(accounts => {
    if (accounts.count===0) {
      res.status(418).send('No account found');
    } else {
      res.send(accounts);
    }
  })
  .catch(error => {
    res.send(error);
  });
});

module.exports = router;
