var _ = require('lodash');

global.Backbone = require('backbone');
global.Backbone.ajax = require('najax');

var assert = require('assert');
var API = require('../');

describe('hashware-backbone-client', function () {
  describe('#create', function () {
    this.timeout(60 * 1000);

    before(function (done) {
      API.create('http://hashware-api.herokuapp.com/api/v1/backbonemodel')
        .then(function (api) {
          global.hashware = api;
          require('./models');
          require('./collections');
          done();
        })
        .catch(done);
    });

    it('should create Group', function () {
      assert(new hashware.Group() instanceof Backbone.Model);
    });
    it('should create Miner', function () {
      assert(new hashware.Miner() instanceof Backbone.Model);
    });
    it('should create MinerState', function () {
      assert(new hashware.MinerState() instanceof Backbone.Model);
    });
    it('should create PoolWorker', function () {
      assert(new hashware.PoolWorker() instanceof Backbone.Model);
    });
  });
});
