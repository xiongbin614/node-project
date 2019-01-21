const express=require('express');
const router=express();

router.get('/',function(req,res){
    res.render('../views/index.ejs');
});

module.exports=router;