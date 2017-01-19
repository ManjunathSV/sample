'use strict';

class VersionController
{
  constructor(){
  }

  setupRoutes( server ){
    server.get( '/version', this.version.bind(this) );
  }

  version(req, res, next){
    res.send( 200, this._getVersion() );
    return next();
  }

  _getVersion(){
    return "1.0.0";
  }
}

module.exports = VersionController;