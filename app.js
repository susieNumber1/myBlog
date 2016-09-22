var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');//处理收藏夹图标
var logger = require('morgan');//处理日志
var cookieParser = require('cookie-parser');
//处理cookie的，引入之后会会有req.cookie方法名(写cookie)，属性名req.cookies(把请求过来的cookie转化成对象)
var bodyParser = require('body-parser');
//解析请求体的

var routes = require('./routes/index');//跟路由
var users = require('./routes/users');//用户路由

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置模板的存放路径
app.set('view engine', 'html');//设置模板的引擎
app.engine('html',require('ejs').__express);//设置对html文件的渲染方式

// uncomment after placing your favicon in /public：当你把图标文件放到/public文件夹下，就可以取消下面的注释（相当于一个静态文件中间件）
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//指定日志输出的格式

//通过Content-Type来处理
app.use(bodyParser.json());//处理请求体是json格式的
app.use(bodyParser.urlencoded({ extended: false }));//处理form-urlencoed格式的


app.use(cookieParser());//处理请求头中的cookie，把请求头中的cookie转化成对象，加入一个cookie函数的属性
app.use(express.static(path.join(__dirname, 'public')));//静态文件的

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);//执行错误处理中间件（4个参数）
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);//设置响应状态码
  res.render('error', {//渲染模板 模版文件 参数数据
    message: err.message,
    error: {}
  });
});


module.exports = app;
