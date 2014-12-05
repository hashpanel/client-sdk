var _ = require('lodash');
var moment = require('moment');
require('twix');

module.exports = {

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
  getCurrentHashRate: function () {
    return this.reduce(function (total, miner) {
      return total + miner.getCurrentHashRate();
    }, 0);
  }
};
