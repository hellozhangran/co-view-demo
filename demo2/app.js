var koa = require('koa');
var path = require('path');
var app = koa();
var router = require('./router')();

app.use(router.routes());

app.listen(3001);
console.log('start server on port : 3001 ....')
