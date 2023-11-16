var express = require('express');
var router = express.Router();

const UserModel = require('../../models/UserModel')
const md5 = require('md5');
router.get('/reg', (req, res) =>{
    res.render('auth/reg');
});

router.post('/reg', (req, res)=>{
    UserModel.create({...req.body, password: md5(req.body.password)}).then((data) =>{
        res.render('success', {msg: 'Register Successfully', url:'/login'});
    }).catch((err)=>{
        res.status(500).send('Register failed, please try again later');
    })
});

router.get('/login', (req, res) =>{
    res.render('auth/login');
});

router.post('/login', (req, res) =>{
    
    let {username, password} = req.body;
    UserModel.findOne({username: username, password:md5(password)}).then((data)=>{
        if(!data){
            return res.send('Username or Password is wrong');
        }
        req.session.username = data.username;
        req.session._id = data._id;
        res.render('success', {msg: 'Login Successfully', url: '/account'});
    }).catch((err)=>{
        res.status(500).send('Failed to login, please try again later');
    })
});

router.post('/logout', (req, res) =>{
    req.session.destroy(()=>{
        res.render('success', {msg: 'Logout Successfully', url: '/login'});
    })
});

module.exports = router;