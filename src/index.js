'use strict';

const restify = require('restify');
const fs = require('fs');
const config = require('config');
const connect = require('connect');
const mustache = require('mustache');
const compression = require('compression');
const serveStatic = require('serve-static');

const calls = require('./calls');

let restServer = restify.createServer({});
restServer.use( restify.bodyParser() );

restServer.use(restify.CORS());

calls.setupCalls( restServer );

function unknownMethodHandler(req, res) {
    if (req.method.toLowerCase() === 'options') {
      var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With', 'Authorization']; // added Origin & X-Requested-With & **Authorization**

      if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
      res.header('Access-Control-Allow-Methods', res.methods.join(', '));
      res.header('Access-Control-Allow-Origin', req.headers.origin);

      return res.send(200);
   } else {
      return res.send(new restify.MethodNotAllowedError());
   }
}

restServer.on('MethodNotAllowed', unknownMethodHandler);

restServer.listen( config.get('restapp.port'), function(){
  console.log( "REST API listening at port " + config.get('restapp.port') )
})


let webappServer = connect();
let serve = serveStatic('public', { 'index': false });
webappServer.use(compression());
webappServer.use(serve);
webappServer.use(function(req,res,next){ 
  fs.readFile('public/index.html','utf-8',(e,data)=>{
    if(e!=null){
      return res.end(e);
    }
    let cont = mustache.render(data, { 
      api_host: config.get('restapp.url') 
    });
    res.end(cont);
  }) 
});

webappServer.listen(config.get('webapp.port'), function(){
  console.log( "Webapp listening at port " + config.get('webapp.port') )
})