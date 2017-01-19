'use strict';

const VersionController = require('../../../src/controller/version')

describe('Version controller', function () {
  it('should give the version when queried', function (done) {
    let vc = new VersionController();
    vc._getVersion().should.equal("1.0.0")
    done();
  });
  
});