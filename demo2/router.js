var router = require('koa-router')();
var view = require('co-view');

const render = view('./views',{
    default:'swig',//如果不写，默认为jade
    map:{
        html:'swig',//指定html文件用swig解析
        ejs:'ejs',//指定ejs文件用ejs解析
        jade:'jade',//...
    }
});

var Router = function(){

    router.get('/',function* (next){
        this.body = yield render('index.html',{name:'Swig'});
    })

    router.get('/jade',function* (){
        this.body = yield render('first.jade',{name:'Jade',title:'jade demo'});
    })

    router.get('/ejs',function* (){
        this.body = yield render('second.ejs',{name:'Ejs'});
    })

    return router;
}

module.exports = Router;
