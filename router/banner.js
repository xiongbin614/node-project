const express = require('express');
const router = express.Router();
const BannerModel = require('../models/banner');


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

module.exports = router;