var _ = require('lodash');
var moment = require('moment');
var util = require('../util');
require('twix');

module.exports = {
  logout: function (url) {
    return $.ajax({
      url: url.protocol + '//' + url.host + '/logout',
      xhrFields: {
        withCredentials: true
      }
    });
  }
};
