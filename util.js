module.exports = {
  /**
   * Convert a value in MH/s to a string with correct units
   */
  mhsToString: function (hashrate) {
    var multiplier = 'M';
    if (hashrate >= 1e3) multiplier = 'G';
    if (hashrate >= 1e6) multiplier = 'T';
    if (hashrate >= 1e9) multiplier = 'P';

    return hashrate.toFixed(2) + ' ' + multiplier + 'H/s';
  }
};
