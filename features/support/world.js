'use strict';

const restify = require('restify');
var {defineSupportCode} = require('cucumber');

function World(){
  let url = "http://localhost:3000"
  this.RestClient = restify.createJsonClient({
    url : url
  })

  this.get = function(path){
    return new Promise((resolve, reject)=>{
      this.RestClient.get(path, function(err, req, res, obj){
        if(err){
          return reject(err);
        }
        else{
          return resolve(obj);
        }
      })
    })
  }
}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(World)
})

