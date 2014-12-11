var _ = require('lodash');
var moment = require('moment');
var util = require('../util');
require('twix');

module.exports = {
  comparator: function (miner) {
    return miner.get('name');
  },

  /**
   * Get d3-compatible hashrate chart data
   */
  getHashchartData: function (_range, _resolution) {
    var range = _range || moment().subtract(1, 'day').twix(moment());
    var resolution = _resolution || moment.duration({ minutes: 1 });

    return this.map(function (miner) {
      var iterator = range.iterate(resolution);
      return {
        key: miner.get('name'),
        values: miner.get('history').getHashchartData(iterator)
      };
    });
  },

  /**
   * Return the total current hash rate of this MinerCollection
   *
   * @return hash rate in MH/s
   */
  getCurrentHashrate: function () {
    return this.reduce(function (total, miner) {
      return total + miner.getCurrentHashrate();
    }, 0);
  },

  /**
   * Get the current hash rate as a formatted string
   */
  getCurrentHashrateString: function () {
    return util.mhsToString(this.getCurrentHashrate());
  },

  /**
   * Return ratio of available miners to unavailable miners
   */
  getAvailability: function () {
    var unavailable = this.reduce(function (total, miner) {
      return total + Number(!miner.isAvailable());
    }, 0);

    return this.length === 0 ? 0 : (unavailable / this.length).toFixed(2);
  },

  /**
   * Return availability ratio as a percentage string
   */
  getAvailabilityString: function () {
    return (this.getAvailability() * 100) + '%';
  },

  /**
   * Return the BTC revenue generated by this MinerCollection for a specified
   * period of time
   *
   * @param duration moment.duration
   */
  getRevenue: function (duration) {
    return $.when(
        $.ajax('https://blockchain.info/q/getdifficulty'),
        $.ajax('https://blockchain.info/q/bcperblock')
      ).then(function (difficulty, blockreward) {
        var d = Number(difficulty[0]);
        var b = Number(blockreward[0]) / 1e8;
        var h = this.getCurrentHashrate();
        var t = duration.seconds();

        return (b * h * t) / (Math.pow(2, 32) * d);
      }.bind(this));
  }
};
