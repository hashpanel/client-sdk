'use strict';

var _ = require('lodash');
var BackboneClient = require('sails-backbone-client');
var DEFAULT_URL = 'https://hashpanel.io/api/v1/backbonemodel';
var namespace = _.extend({ }, require('./models'), require('./collections'));

/**
 * Generate the client-side Backbone models from the schema provided by the
 * server
 */
exports.create = function (_url) {
  var url = _url || DEFAULT_URL;

  return BackboneClient.create(url, namespace);
};

exports.getNamespace = function () {
  return namespace;
};
