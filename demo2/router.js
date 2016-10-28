var router = require('koa-router')();
var Router = function(){

    router.get('/',function* (next){
        yield this.render('index',{
            name:'Hello koa-swig'
        });
    })

    return router;
}

module.exports = Router;
