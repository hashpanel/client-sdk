var _ = require('lodash');
var moment = require('moment');

module.exports = {

  /**
   * @return cgminer session update as a momentjs duration
   * <http://momentjs.com/docs/#/durations>
   */
  getUptime: function () {
    return moment.duration(this.get('state').get('summary').Elapsed);
  },

  /**
   * @return most recent recorded temperature in Celsius
   */
  getTemperature: function () {
    return _.max(this.get('state').get('devs'), 'Temperature').Temperature;
  },

  /**
   * Get most recent hashrate reported by cgminer for this Miner
   *
   * @return hash rate in GH/s
   */
  getCurrentHashRate: function () {
    return _.reduce(this.get('state').get('devs'), function (total, dev) {
      return total + (dev['MHS 5s'] / 1000);
    }, 0);
  },

  /**
   * Get the average hashrate for the Miner's current cgminer session
   *
   * @return hash rate in GH/s
   */
  getSessionHashRate: function () {
    return _.reduce(this.get('state').get('devs'), function (total, dev) {
      return total + (dev['MHS av'] / 1000);
    }, 0);
  },

  /**
   * Get the ratio the current measured hash rate to the rated device hash rate.
   * This indicates how well the hardware is performing relative to its
   * advertised speeds.
   */
  getPerformanceRatio: function () {
    return (this.getCurrentHashRate() / this.get('device').get('hashRate')).toFixed(2);
  }
};
