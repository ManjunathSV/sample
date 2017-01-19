'use strict';
const fs = require('fs');

module.exports.setupCalls = function(server){
  let controllerPath = __dirname + '/controller';
  let files = fs.readdirSync( controllerPath );
  for(let i=0; i<files.length; i++){
    let controllerClass = require( controllerPath + '/' + files[i] );
    let controllerObj = new controllerClass();
    controllerObj.setupRoutes( server );
  }
}
