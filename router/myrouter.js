const express = require('express');
const router = express.Router();
const myfilmsModel = require('../models/myfilms');
const myfilmadressModel = require('../models/myfilmadress');
const async = require('async');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// 获取电影信息
router.get('/search',(req,res) =>{
  myfilmsModel.find().then((datas)=>{
    if (datas){
      res.json({
        code:0,
        data: datas,
        msg:'ok'
      })
    }else{
      res.json({
        code:-1,
        data: datas.message,
        msg:'获取数据失败'
      })
    }
    console.log(datas)
  })
})
// 获取地址信息
router.get('/searchadress', (req, res) => {
  myfilmadressModel.find().then((datas) => {
    if (datas) {
      res.json({
        code: 0,
        data: datas,
        msg: 'ok'
      })
    } else {
      res.json({
        code: -1,
        data: datas.message,
        msg: '获取数据失败'
      })
    }
    console.log(datas)
  })
})
module.exports = router;
