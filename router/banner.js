const express = require('express');
const router = express.Router();
const BannerModel = require('../models/banner');
const async = require('async');

// 添加banner数据
router.post('/add', function (req, res) {
    // console.log(req.body.vdName, req.body.imgName);
    // res.send('成功');
    var banner = new BannerModel({
        name: req.body.vdName,
        imgUrl: req.body.imgName
    });
    banner.save(function(err){
        if (err) {
            res.json({
                code: -1,
                msg: err.message
            })
        } else {
            // 成功
            res.json({
                code: 0,
                msg: 'ok'
            })
        }
    })
    
});

// 查询banner数据
router.get('/get',function(req,res){
    let pageNum = parseInt(req.query.pageNum) || 1;   // 当前的页数
    let pageSize = parseInt(req.query.pageSize) || 2; // 每页显示的条数
    // res.send('5')
    // console.log(req.query.pageNum, req.query.pageSize);
    // console.log(pageNum, pageSize)
    async.parallel([
        function (cb) {
            BannerModel.find().skip(pageNum * pageSize - pageSize).limit(pageSize).then(data => {
                cb(null, data);//分页后的数据
            }).catch(err => {
                cb(err);
            })
        },
        function(cb){
            BannerModel.find().count().then(function (num) {
                cb(null,num);
            }).catch(function(err){
                if(err){
                    cb(err);
                }
            });
        }
    ], function (err, result){
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
                    // result: result[0].length,
                    data: result[0],
                    totalPage: Math.ceil(result[0].length / pageSize)
                });
            }
    })  
});
// 查找banner的_id数据删除
router.get('/remove',function(req,res){
    console.log(req.query.name);
    
    // console.log(55)
    BannerModel.find({ name: req.query.name}).remove(function(err){
        if(err){
            console.log("删除失败");
            res.json({
                code: -1,
                msg: err.message
            });
        }else{
            console.log("删除成功");
            res.json({
                code: 0,
                msg: 'ok',
            });
        }
    });
})

module.exports = router;