const express = require('express');

const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware');

const router = express.Router();

//tally book list
/* GET home page. */
router.get('/', (req, res)=>{
  res.redirect('/account');
})

router.get('/account', checkLoginMiddleware, function(req, res, next) {
  AccountModel.find().sort({time: -1}).then((data, err) =>{
    if(err){
      res.status(500).send('Failed to read data');
      return;
    }
    res.render('list', {accounts:data, moment: moment});
  })
});

router.get('/account/create', checkLoginMiddleware, function(req, res, next){
  res.render('create'); 
});

router.post('/account', checkLoginMiddleware, (req, res) =>{
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }).then((data, err) =>{
    if(err){
      console.log(err)
      res.status(500).send('Failed to insert');
      return;
    }
    res.render('success', {msg: "Add Successfully~~", url: '/account'});
  }) 
})

router.get('/account/:id', checkLoginMiddleware, (req, res) =>{
  let id = req.params.id;
  AccountModel.deleteOne({_id:id}).then((data, err)=>{
    if(err){
      res.status(500).send('Failed to delete');
      return;
    }
    res.render('success', {msg: "Delete Successfully~~", url: '/account'});
  })
})

module.exports = router;
