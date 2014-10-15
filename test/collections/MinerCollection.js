var assert = require('assert');
var _ = require('lodash');

describe('MinerCollection', function () {
  it('should exist', function () {
    assert(hashware.MinerCollection);
  });
  describe('#getDeviceHashRate', function () {
    var minerCollection = [
      new hashware.Miner({
        id: 1,
        device: new hashware.MinerDevice({
          id: 1,
          hashRate: 1
        })
      }),
      new hashware.Miner({
        id: 2,
        device: new hashware.MinerDevice({
          id: 2,
          hashRate: 1
        })
      })
    ];
    it('should exist', function () {
      assert(_.isFunction(hashware.MinerCollection.prototype.getDeviceHashRate));
    });
    it('should aggregate hashrate correctly', function () {
      var miners = new hashware.MinerCollection(minerCollection);
      var deviceHashRate = miners.getDeviceHashRate();
      assert(deviceHashRate === 2, 'deviceHashRate ' + deviceHashRate);
    });
  });
});
