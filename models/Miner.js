var _ = require('lodash');
var moment = require('moment');
var util = require('../util');

module.exports = {
  getDeviceString: function () {
    var device = this.get('device');
    return device.get('manufacturer') + ' ' + device.get('name');
  },

  /**
   * @return cgminer session update as a momentjs duration
   * <http://momentjs.com/docs/#/durations>
   */
  getUptime: function () {
    return moment.duration(this.get('state').get('summary').Elapsed, 'seconds');
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
   * @return hash rate in MH/s
   */
  getCurrentHashrate: function () {
    var state = this.get('state');
    return (state && state.getInstantaneousHashrate()) || 0;
  },

  /**
   * Get the average hashrate for the Miner's current cgminer session
   *
   * @return hash rate in MH/s
   */
  getSessionHashrate: function () {
    return this.get('state').getAverageHashrate();
  },

  getDeclaredHashrateString: function () {
    return util.mhsToString(this.get('hashRate'));
  },

  getRatedHashrateString: function () {
    return util.mhsToString(this.get('device').get('hashRate'));
  },

  /**
   * Get the ratio the current measured hash rate to the rated device hash rate.
   * This indicates how well the hardware is performing relative to its
   * advertised speeds.
   */
  getPerformanceRatio: function () {
    var hashRate = this.get('hashRate') || this.get('device').get('hashRate');
    return (this.getCurrentHashrate() / hashRate) || 0;
  },

  getPerformancePercentageString: function () {
    var ratio = this.getPerformanceRatio();
    if (!_.isFinite(ratio)) {
      ratio = 0;
    }
    return (ratio * 100).toFixed(0) + '%';
  },

  /**
   * Check the last known state of the miner, and return true if the miner was
   * available, and false otherwise.
   */
  isAvailable: function () {
    return this.get('state').get('success');
  },

  /**
   * getChartData
   *
   * Query /miner/<id>/chart for d3-compatible chart data
   */
  getChartData: function (parameters) {
    console.log('getChartData: ', parameters);
    return $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: this.url() + '/chart',
      data: parameters
    });
  },

  /**
   * Get the current hash rate as a formatted string
   */
  getCurrentHashrateString: function () {
    return util.mhsToString(this.getCurrentHashrate());
  }
};
