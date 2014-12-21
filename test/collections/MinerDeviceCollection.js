var assert = require('assert');
var _ = require('lodash');

describe('MinerDeviceCollection', function () {
  var devices;
  before(function (done) {
    devices = new hashware.MinerDeviceCollection();
    devices.fetch({
      success: function (collection) {
        done();
      },
      error: function (collection, error) {
        done(new Error(JSON.stringify(error)));
      }
    });
  });

  it('should exist', function () {
    assert(hashware.MinerDeviceCollection);
  });
  describe('#fetch', function () {
    it('should fetch some devices', function () {
      assert(devices.size() > 0);
    });
  });
  describe('#getList()', function () {
    it('should exist', function () {
      assert(_.isFunction(hashware.MinerDeviceCollection.prototype.getList));
    });
    it('should return make/model of devices in a list', function () {
      var deviceNames = devices.getList();

      console.log(deviceNames);

      assert(_.contains(deviceNames, 'Bitmain Antminer S3'));
      assert(_.contains(deviceNames, 'Spondoolies SP20'));
    });
  });
});
