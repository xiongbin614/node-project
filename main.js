const express= require('express');
const ejs=require('ejs');
const cookieParser=require('cookie-parser');
const app = express();

// 中间件函数
//获取post请求时的中间件函数
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// 使用cookie时的中间件函数
app.use(cookieParser());

// 创建ejs模板以及路径
app.set('views', './views');
app.set('view engine', 'ejs');

// 静态文件路径文件夹
app.use(express.static('public'));
app.use(function(req,res,next){
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Headers','Content-Type')
    next();
})

// 配置路由
const indexRouter=require('./router/index');
const bannerRouter = require('./router/banner');
const filmRouter = require('./router/film');
const cinemaRouter = require('./router/cinema');
const userRouter = require('./router/user');
const myRouter = require('./router/myrouter');
app.use('/', indexRouter);
app.use('/banner', bannerRouter);
app.use('/film', filmRouter);
app.use('/cinema', cinemaRouter);
app.use('/user', userRouter);
app.use('/myrouter', myRouter);



app.listen(3000);