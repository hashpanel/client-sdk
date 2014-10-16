var _ = require('lodash');

module.exports = {
  /**
   * Return the total hash rate of this MinerCollection, based on the declared
   * hash rate of the devices.
   *
   * @return hash rate in GH/s
   */
  getDeviceHashRate: function () {
    return this.reduce(function (total, miner) {
      return total + miner.get('device').get('hashRate');
    }, 0);
  }


};
