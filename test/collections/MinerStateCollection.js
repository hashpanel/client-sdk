var assert = require('assert');
var _ = require('lodash');
var moment = require('moment');
require('twix');
_.mixin(require('congruence'));

describe('MinerStateCollection', function () {
  describe('#getHashchartData', function () {
    var range = moment().subtract(1, 'day').twix(moment());
    var iterator = range.iterate(moment.duration({ minutes: 5 }));

    it.skip('should return data in a d3-compatible format', function () {
      var miner = hashware.Miner.find({ id: 1 });
      var data = miner.get('history').getHashchartData(iterator);

      _.each(data, function (event) {
        assert(_.congruent({ date: _.isDate, mhs: _.isNumber }));
      });
    });
  });

});
