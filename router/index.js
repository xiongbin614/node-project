const express=require('express');
const router=express.Router();

router.get('/',function(req,res){
    res.render('index.ejs');
});
router.get('/banner', function (req, res) {
    res.render('banner.ejs');
});

module.exports=router;