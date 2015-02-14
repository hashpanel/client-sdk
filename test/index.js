/* global hashware */

'use strict';

var assert = require('assert');
var path = require('path');
var SailsApp = require('sails').Sails;
var _ = require('lodash');

/*
najax.defaults({
  url: {
    hostname: 'localhost',
    port: '1337',
    protocol: 'http'
  },
  headers: {
    Authorization: 'Basic YWRtaW46YWRtaW4xMjM0'  // encoding of default admin user/pass
  }
});
*/

var BackboneClient = require('../');
global.Backbone.ajax = require('backbone.ajax');

var util = require('util');
var assert = require('assert');
var HASHWARE_BASEURL = 'http://localhost:1337';
var HASHWARE_BACKBONEMODELS_URL = HASHWARE_BASEURL + '/api/v1/backbonemodel';

describe('hashware-backbone-client', function () {
  var url = 'http://localhost:1337/api/v1/backbonemodel';
  var schema;
  var app = new SailsApp();
  var hashpanel;
  var ns = {
    Miner: {
      foo: function () {
        return 'bar';
      },
      whoami: function () {
        return this.name;
      }
    }
  };

  var config = {
    appPath: path.dirname(require.resolve('hashware-api')),
    hooks: {
      grunt: false
    },
    config: {
      adminUsername: 'admin@hashpanel.io',
      adminPassword: 'admin1234',
      adminEmail: 'admin@hashpanel.io'
    }
  };

  before(function (done) {
    this.timeout(60 * 1000);

    BackboneClient = require('./');
    global.Backbone.ajax = require('backbone.ajax');

    app.lift(config, function (error, sails) {
      app = sails;

      done(error);
    });
  });

  describe('#create()', function () {
    this.timeout(60 * 1000);

    before(function (done) {
      BackboneClient.create(HASHWARE_BACKBONEMODELS_URL)
        .then(function (api) {
          global.hashware = api;
          require('./models');
          require('./collections');
          done();
        })
        .catch(function (error) {
          done(error);
        });
    });

    it('can instantiate Miner', function () {
      var miner = new hashware.Miner();
      assert(_.isObject(miner));
      assert(miner instanceof hashware.Miner);
    });
    it('can instantiate MinerState', function () {
      var state = new hashware.MinerState();
      assert(_.isObject(state));
      assert(state instanceof hashware.MinerState);
    });
    it('can instantiate Group', function () {
      var group = new hashware.Group();
      assert(_.isObject(group));
      assert(group instanceof hashware.Group);
    });
    it('can instantiate Group', function () {
      var worker = new hashware.PoolWorker();
      assert(_.isObject(worker));
      assert(worker instanceof hashware.PoolWorker);
    });
  });
});
