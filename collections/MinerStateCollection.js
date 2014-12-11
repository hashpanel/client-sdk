var _ = require('lodash');
var moment = require('moment');
require('twix');

module.exports = {
  comparator: function (state) {
    return new Date(state.get('createdAt')).valueOf();
  }
};
