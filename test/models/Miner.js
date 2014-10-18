var assert = require('assert');
var _ = require('lodash');
var moment = require('moment');

describe('Miner', function () {
  var miner1 = new hashware.Miner({
    id: Math.random() * 1000,
    device: new hashware.MinerDevice({
      id: Math.random() * 1000,
      hashRate: 4
    }),
    state: new hashware.MinerState({
      id: Math.random() * 1000,
      summary: {
        Elapsed: 86400
      },
      devs: [
        {
          Temperature: 65,
          'MHS 5s': 1000,
          'MHS av': 1000
        },
        {
          Temperature: 70,
          'MHS 5s': 1000,
          'MHS av': 1000
        },
        {
          Temperature: 60,
          'MHS 5s': 1000,
          'MHS av': 1000
        }
      ]
    })
  });
  it('should exist', function () {
    assert(hashware.Miner);
  });
  describe('#getUptime', function () {
    it('should return momentjs duration of current cgminer session', function () {
      assert.equal(miner1.getUptime().valueOf(), moment.duration({ days: 1 }).valueOf());
    });
  });
  describe('#getTemperature', function () {
    it('should return the maximum temperature of the cgminer devs in Celsius', function () {
      assert.equal(miner1.getTemperature(), 70);
    });
  });
  describe('#getCurrentHashRate', function () {
    it('should return the current hash rate in GHs', function () {
      assert.equal(miner1.getCurrentHashRate(), 3);
    });
  });
  describe('#getSessionHashRate', function () {
    it('should return the average cgminer session hash rate in GHs', function () {
      assert.equal(miner1.getSessionHashRate(), 3);
    });
  });
  describe('#getPerformanceRatio', function () {
    it('should calculate current hashrate to device hashrate ratio', function () {
      assert.equal(miner1.getPerformanceRatio(), 0.75);
    });
  });
});
