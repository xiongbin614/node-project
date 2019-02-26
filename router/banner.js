const express = require('express');
const router = express.Router();
const BannerModel = require('../models/banner');
const async = require('async');
const fs =require('fs');
const path = require('path');
const multer = require('multer');
// 指定下载的目录
const upload = multer({
    dest: 'c:/tmp'
});
router.post('/add', upload.single('bannerImg'), (req, res) => {
    // 1. 操作文件
    let newFileName = new Date().getTime() + '_' + req.file.originalname;
    let newFilePath = path.resolve(__dirname, '../public/uploads/banners/', newFileName);
    // 2. 移动文件
    try {
        let data = fs.readFileSync(req.file.path);
        fs.writeFileSync(newFilePath, data);
        fs.unlinkSync(req.file.path);

        // 文件的名字 + banner 图的名字给写入到数据库
        let banner = new BannerModel({
            name: req.body.bannerName,
            imgUrl: 'http://localhost:3000/uploads/banners/' + newFileName
        });

        banner.save().then(() => {
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
    } catch (error) {
        res.json({
            code: -1,
            msg: error.message
        })
    }
})

// 添加banner数据
// router.post('/add', function (req, res) {
//     // res.send('成功');
//     var banner = new BannerModel({
//         name: req.body.vdName,
//         imgUrl: req.body.imgName
//     });
//     banner.save(function (err) {
//         if (err) {
//             res.json({
//                 code: -1,
//                 msg: err.message
//             })
//         } else {
//             // 成功
//             res.json({
//                 code: 0,
//                 msg: 'ok'
//             })
//         }
//     })

// });

// router.post('/add', function (req, res) {
//     // res.send('成功');
//     var banner = new BannerModel({
//         name: req.body.vdName,
//         imgUrl: req.body.imgName
//     });
//     banner.save(function(err){
//         if (err) {
//             res.json({
//                 code: -1,
//                 msg: err.message
//             })
//         } else {
//             // 成功
//             res.json({
//                 code: 0,
//                 msg: 'ok'
//             })
//         }
//     })
    
// });

// 查询banner数据
router.get('/get',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    let pageNum = parseInt(req.query.pageNum) || 2;   // 当前的页数
    let pageSize = parseInt(req.query.pageSize) || 2; // 每页显示的条数
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
                    data: result[0],
                    totalPage: Math.ceil(result[1]/ pageSize)
                });
            }
    })  
});
// 查找banner的_id数据删除
router.get('/remove',function(req,res){
    console.log(req.query.name);
    BannerModel.find({ _id: req.query.name}).remove(function(err){
        if(err){
            console.log("删除失败");
            res.json({
                code: -1,
                msg: err.message
            });
        }else{
            console.log("删除成功");
            //删除public下面的图片
            res.json({
                code: 0,
                msg: 'ok',
            });
        }
    });
})

module.exports = router;