const express = require('express');
const router = express.Router();
const CinemaModel = require('../models/cinema');
const async = require('async');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
// 添加影院地址
router.post('/add',function(req,res){
    // res.send(req.body.cinemaName, req.body.cinemaAdress);
    let cinema = new CinemaModel({
        cinemaName: req.body.cinemaName,
        cinemaAdress: req.body.cinemaAdress
    });
    cinema.save().then(()=>{
        res.json({
            code: 0,
            msg: 'ok'
        })
    }).catch(error => {
        res.json({
            code: -1,
            msg: error.message
        })
    })
});
// 获取数据渲染页面
router.get('/get',function(req,res){
    let pageNum = parseInt(req.query.pageNum) || 2;   // 当前的页数
    let pageSize = parseInt(req.query.pageSize) || 2; // 每页显示的条数
    async.parallel([
        function (cb) {
            CinemaModel.find().skip(pageNum * pageSize - pageSize).limit(pageSize).then(data => {
                cb(null, data);//分页后的数据
            }).catch(err => {
                cb(err);
            })
        },
        function (cb) {
            CinemaModel.find().count().then(function (num) {
                cb(null, num);
            }).catch(function (err) {
                if (err) {
                    cb(err);
                }
            });
        }
    ], function (err, result) {
        if (err) {
            res.json({
                code: -1,
                msg: err.message
            });
            console.log("错误");
        } else {
            res.json({
                code: 0,
                msg: 'ok',
                data: result[0],
                totalPage: Math.ceil(result[1] / pageSize)
            });
        }
    });
});
// 查找banner的_id数据删除
router.get('/remove', function (req, res) {
    CinemaModel.find({ _id: req.query.name }).remove(function (err) {
        if (err) {
            console.log("删除失败");
            res.json({
                code: -1,
                msg: err.message
            });
        } else {
            console.log("删除成功");
            //删除public下面的图片
            res.json({
                code: 0,
                msg: 'ok',
            });
        }
    });
})
module.exports=router;