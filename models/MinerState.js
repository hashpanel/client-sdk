var _ = require('lodash');

module.exports = {
  /**
   * Return 5s hashrate recorded in this state
   */
  getInstantaenousHashrate: function () {
    //console.log(this.get('devs'));
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
  }
};
