var _ = require('lodash');
var jsdom = require('jsdom');
var doc = jsdom.jsdom();

global.Backbone = require('backbone');
global.Backbone.ajax = require('najax');

var assert = require('assert');
var API = require('../');

describe('hashware-backbone-client', function () {
  var hashware;

  describe('#create', function () {
    before(function (done) {
      API.create('http://hashware-api.herokuapp.com/api/v1/backbonemodel')
        .then(function (api) {
          hashware = api;
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

  require('./models');

});
