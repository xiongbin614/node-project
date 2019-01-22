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

// 配置路由
const indexRouter=require('./router/index');
const bannerRouter = require('./router/banner');
app.use('/', indexRouter);
app.use('/banner', bannerRouter);



app.listen(3000);