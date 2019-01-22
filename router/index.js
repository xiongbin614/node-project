const express=require('express');
const router=express.Router();

// 首页
router.get('/',function(req,res){
    res.render('index.ejs',{
        h1:'用户管理'
    });
});
// banner图管理
router.get('/banner', function (req, res) {
    res.render('banner.ejs',{
        h1:"banner图管理"
    });
});
// 影片管理film
router.get('/film', function (req, res) {
    res.render('film.ejs', {
        h1: "影片管理"
    });
});
//影院管理cinema 
router.get('/cinema', function (req, res) {
    res.render('cinema.ejs', {
        h1: "影院管理"
    });
});
module.exports=router;