# koa-swig co-view 库的使用例子

##1. 起因
1. 最近接手的koa项目，用了swig模板引擎，用了基于koa的`koa-swig`包，发现项目并非直接使用`koa-swig`，而是又用`co-view`包装了一层，这个`co-view`是怎样用的。

2. 另，发现项目在package.json中配置了swig、koa-swig两个包，但整个项目没有发现`require("swig")`，怀疑swig模块是多余的。

##2. koa-swig的使用

代码中demo1 是使用`koa-swig`模块的例子。`koa-swig`是一个独立的模块，在koa项目中，只需要引用这一个模块就即可使你的koa站点能够用swig解析模板。

```
//app.js

var koa = require('koa');
var render = require('koa-swig');
var path = require('path');
var app = koa();
var router = require('./router')();
//koa-swig 2.0以上的版本用下面的方式来配置koa-swig，这里我也很奇怪，为何不用app.use()的方式。
//总之，配置下面代码之后，在后续使用的generator函数中，调用this.render就会用koa-swig
app.context.render = render({
    root: path.join(__dirname, './views'),//设置swig解析页面文件的根路径
    autoescape: true,//如果true，就会转义html标签，eg：'<' -> '&lt;'
    cache: 'memory',//开启缓存，多次渲染模板的时候，重复操作调用缓存。
    ext: 'html',//识别html文件
});
app.use(router.routes());
app.listen(3001);
```
下面是router.js，对swig的使用在里面。
```
var router = require('koa-router')();
var Router = function(){
    //访问根路径时，会来到这个generator里面
    router.get('/',function* (next){
        yield this.render('index',{//此时的render用swig来实现
            name:'Hello koa-swig'
        });
    })
    return router;
}
module.exports = Router;

```

使用koa-swig解析的方式非常简单，不过关于swig详细语法需另外学习，基本语法很简单的，不赘述。

##3. co-view介绍以及使用

首先，co-view是一个组织模板引擎的工具。比如，你的页面中，有的需要swig去解析，有的需要jade去解析，有的需要ejs去解析。如何去配置不同的页面文件，用不同引擎去解析呢，这就是co-view的作用。源码中demo2是例子。
