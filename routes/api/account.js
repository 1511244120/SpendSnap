var express = require('express');
var router = express.Router();

const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
//tally book list
/* GET home page. */
router.get('/account', function(req, res, next) {
  AccountModel.find().sort({time: -1}).then((data) =>{
    res.json({
        code: '0000',
        msg: 'read successfully',
        data: data
    });
  }).catch((err)=>{
    res.json({
        code: '1001',
        msg: 'Failed to read',
        data: null
    })
    return;
  })
});

router.post('/account', (req, res) =>{
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }).then((data) =>{
    res.json({
        code: '0000',
        msg: 'create successfully',
        data: data
    });
  }).catch((err)=>{
    console.log(err)
    res.json({
        code: '1002',
        msg: 'Failed to create',
        data: null
    })
  })
})

router.delete('/account/:id', (req, res) =>{
  let id = req.params.id;
  AccountModel.deleteOne({_id:id}).then((data)=>{
    res.json({
        code: '0000',
        msg: 'delete successfully',
        data: {}
    })
  }).catch((err)=>{
    res.json({
      code: '1003',
      msg: 'Failed to delete',
      data: null
    })
  })
})

router.get('/account/:id', (req, res) =>{
    let {id} = req.params;

    AccountModel.findById(id).then((data) =>{
        res.json({
            code: '0000',
            msg: 'read successfully',
            data: data
        })
    }).catch((err) =>{
        res.json({
            code: '1004',
            msg: 'Failed to read',
            data: null
        })
    })
})

router.patch('/account/:id', (req, res) =>{
    let {id} = req.params;

    AccountModel.updateOne({_id:id}, req.body).then((data) =>{
        AccountModel.findById(id).then((datainfo)=>{
            res.json({
                code: '0000',
                msg: 'update successfully',
                data: datainfo
            })
        }).catch((err) =>{
            res.json({
                code: '1004',
                msg: 'Failed to read',
                data: null
            })
        })
    }).catch((err) =>{
        res.json({
            code: '1005',
            msg: 'Failed to update',
            data: null
        })
    })
})
module.exports = router;
