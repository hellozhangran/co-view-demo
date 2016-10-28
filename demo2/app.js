var koa = require('koa');
var render = require('koa-swig');
var path = require('path');
var app = koa();
var router = require('./router')();

//该例子用koa-swig来解析模板
app.context.render = render({
    root: path.join(__dirname, './views'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    // locals: locals,
    // filters: filters,
    // tags: tags,
    // extensions: extensions
});

app.use(router.routes());

app.listen(3001);
console.log('start server on port : 3001 ....')
