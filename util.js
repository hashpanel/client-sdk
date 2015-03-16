module.exports = {
  /**
   * Convert a value in MH/s to a string with correct units
   */
  mhsToString: function (hashrate) {
    if (hashrate <= 0 || _.isNaN(hashrate)) {
      return 'N/A';
    }
    if (hashrate < 1e3) {
      return hashrate.toFixed(2) + 'MH/s';
    }
    if (hashrate < 1e6) {
      return (hashrate / 1e3).toFixed(2) + 'GH/s';
    }
    if (hashrate < 1e9) {
      return (hashrate / 1e6).toFixed(2) + 'TH/s';
    }

    return (hashrate / 1e9).toFixed(2) + 'PH/s';
  }
};
