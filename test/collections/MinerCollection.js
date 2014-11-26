var assert = require('assert');
var _ = require('lodash');

describe('MinerCollection', function () {
  it('should exist', function () {
    assert(hashware.MinerCollection);
  });
  it('#fetch', function (done) {
    var miners = new hashware.MinerCollection();
    miners.fetch({
      success: function () {
        console.log(miners);
        done();
      },
      error: function () {
        done(arguments);
      }
    });
  });
  describe('#getCurrentHashRate', function () {
    var minerCollection = [
      new hashware.Miner({
        id: 1,
        state: new hashware.MinerState({
          id: 1,
          devs: [
            { 'MHS 5s': 1000 },
            { 'MHS 5s': 2000 }
          ]
        })
      }),
      new hashware.Miner({
        id: 2,
        state: new hashware.MinerState({
          id: 2,
          devs: [
            { 'MHS 5s': 3000 },
            { 'MHS 5s': 4000 }
          ]
        })
      })
    ];
    it('should exist', function () {
      assert(_.isFunction(hashware.MinerCollection.prototype.getCurrentHashRate));
    });
    it('should aggregate hashrate correctly', function () {
      var miners = new hashware.MinerCollection(minerCollection);
      var currentHashRate = miners.getCurrentHashRate();
      assert(currentHashRate === 10, 'currentHashRate ' + currentHashRate);
    });
  });
});
