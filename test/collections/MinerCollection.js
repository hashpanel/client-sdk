var assert = require('assert');
var _ = require('lodash');

describe('MinerCollection', function () {
  it('should exist', function () {
    assert(hashware.MinerCollection);
  });
  it.skip('#fetch', function (done) {
    var miners = new hashware.MinerCollection();
    miners.fetch({
      success: function () {
        done();
      },
      error: function () {
        console.error(arguments);
        done(arguments);
      }
    });
  });
  describe('#getCurrentHashrate', function () {
    var minerCollection = [
      new hashware.Miner({
        id: Math.random() * 1000,
        state: new hashware.MinerState({
          id: Math.random() * 1000,
          devs: [
            { 'MHS 5s': 1000 },
            { 'MHS 5s': 2000 }
          ]
        })
      }),
      new hashware.Miner({
        id: Math.random() * 1000,
        state: new hashware.MinerState({
          id: Math.random() * 1000,
          devs: [
            { 'MHS 5s': 3000 },
            { 'MHS 5s': 4000 }
          ]
        })
      })
    ];
    it('should exist', function () {
      assert(_.isFunction(hashware.MinerCollection.prototype.getCurrentHashrate));
    });
    it('should aggregate hashrate correctly', function () {
      var miners = new hashware.MinerCollection(minerCollection);
      var currentHashRate = miners.getCurrentHashrate();
      assert(currentHashRate === 10000, 'currentHashRate ' + currentHashRate);
    });
  });
});
