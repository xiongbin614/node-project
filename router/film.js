const express = require('express');
const router = express.Router();
const FilmModel = require('../models/film');
const async = require('async');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
// 指定下载的目录
const upload = multer({
    dest: 'c:/tmp'
});
// 存储films的信息
router.post('/add', upload.single('filmImg'), (req, res) => {
    // 1. 操作文件
    let newFileName = new Date().getTime() + '_' + req.file.originalname;
    let newFilePath = path.resolve(__dirname, '../public/uploads/films/', newFileName);
    // 2. 移动文件
    try {
        let data = fs.readFileSync(req.file.path);
        fs.writeFileSync(newFilePath, data);
        fs.unlinkSync(req.file.path);
        console.log(req.body)

        // 文件的名字 + banner 图的名字给写入到数据库
        let film = new FilmModel({
            name: req.body.filmName,
            imgUrl: 'http://localhost:3000/uploads/films/' + newFileName
        });

        film.save().then(() => {
            res.json({
                code: 0,
                msg: 'ok',
                ss:req.body
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

// 查询banner数据
router.get('/get', function (req, res) {
    let pageNum = parseInt(req.query.pageNum) || 2;   // 当前的页数
    let pageSize = parseInt(req.query.pageSize) || 2; // 每页显示的条数
    async.parallel([
        function (cb) {
            FilmModel.find().skip(pageNum * pageSize - pageSize).limit(pageSize).then(data => {
                cb(null, data);//分页后的数据
            }).catch(err => {
                cb(err);
            })
        },
        function (cb) {
            FilmModel.find().count().then(function (num) {
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
    })
});

// 查找banner的_id数据删除
router.get('/remove', function (req, res) {
    // console.log(req.query.name);
    FilmModel.find({ _id: req.query.name }).remove(function (err) {
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
module.exports = router;
