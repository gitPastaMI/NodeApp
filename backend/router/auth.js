const express = require('express');
const router = express.Router();

router.post('/auth/register',(req,res) => {
  console.log('BACKEND post /auth/register 3',req.body);
  const user = req.body;
  console.log('BACKEND post /auth/register 4',req.body);
  res.send(user);
});

router.post('/auth/login',(req,res) => {
  console.log('BACKEND post /auth/login 3',req.body);
  const user = req.body;
  console.log('BACKEND post /auth/login 4',req.body);
  res.send(user);
});

router.get('/users',(req,res) => {
  console.log('BACKEND get /users 3',req.body);
  const users = [
    {username: 'a'},
    {username: 'b'},
    {username: 'c'},
  ];
  console.log('BACKEND get /users 4',req.body);
  res.send(users);
});

module.exports = router;
