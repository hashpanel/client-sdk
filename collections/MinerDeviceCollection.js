var _ = require('lodash');

module.exports = {
  /**
   * Return a list of make/model strings for each device
   */
  getList: function () {
    return this.map(function (device) {
      return device.get('manufacturer') + ' ' + device.get('name');
    });
  }
};
