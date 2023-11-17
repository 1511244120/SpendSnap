var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const {secret} = require('../../config/config');
const UserModel = require('../../models/UserModel');
const md5 = require('md5');

router.post('/login', (req, res) =>{
    
    let {username, password} = req.body;
    UserModel.findOne({username: username, password:md5(password)}).then((data)=>{
        if(!data){
            return res.json({
                code: '2002',
                msg: 'Username or password is wrong',
                data: null
            })
        }
        let token = jwt.sign({
            username: data.username,
            _id: data._id
        }, secret, {
            expiresIn: 60 * 60 * 24 * 7
        });

        res.json({
            code: '0000',
            msg: 'Login Successfully',
            data: token
        })
    }).catch((err)=>{
        res.json({
            code: '2001',
            msg: 'Failed to read from databse',
            data: null
        })
    })
});

router.post('/logout', (req, res) =>{
    req.session.destroy(()=>{
        res.render('success', {msg: 'Logout Successfully', url: '/login'});
    })
});

module.exports = router;