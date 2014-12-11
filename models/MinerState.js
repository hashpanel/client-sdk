var _ = require('lodash');

module.exports = {
  /**
   * Return 5s hashrate recorded in this state
   */
  getInstantaneousHashrate: function () {
    return _.reduce(this.get('devs'), function (total, dev) {
      return total + dev['MHS 5s'];
    }, 0);
  },

  /**
   * Return av hashrate recorded in this state
   */
  getAverageHashrate: function () {
    return _.reduce(this.get('devs'), function (total, dev) {
      return total + dev['MHS av'];
    }, 0);
  },

  toString: function () {
    return this.get('success') ? 'OK' : 'ERROR';
  }
};
