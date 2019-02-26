const express = require('express');
const router = express.Router();
const registerModel = require('../models/register');
const async = require('async');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

router.post('/register',function(req,res){
    // let userName = new registerModel({
        // userName: req.body.userName
    // });
    // userName.findOne({
        //查找用户名是否存在
    // });
    let register = new registerModel({
        userName: req.body.userName,
        password: req.body.pwd,
        nickName: req.body.nickName,
        isAdmin: req.body.isAdmin
    });
    register.save().then(() => {
        res.json({
            code: 0,
            msg: 'ok'
        });
        // window.location.href='/banner'
    }).catch(error => {
        res.json({
            code: -1,
            msg: error.message
        })
    });
});
router.post('/login', function (req, res) {
    let userName = req.body.userName;
    let password = req.body.pwd;
    // let register = new registerModel({
    //     userName : req.body.userName,
    //     password: req.body.pwd
    // });
    // { 'userName': userName, 'password': password }
    // registerModel.findOne({ userName: userName, password: password },function(err,doc){
    //     console.log(err,doc)
    // });
    registerModel.findOne({ userName: userName, password: password }).then((data)=>{
        if(data){
            res.json({
                code:0,
                msg:'ok'
            })
        }else{
            res.json({
                code:-1,
                msg:'用户名或者密码错误'
            })
        }
    })
});

module.exports=router;