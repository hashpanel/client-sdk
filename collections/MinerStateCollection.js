var _ = require('lodash');
var moment = require('moment');
require('twix');

module.exports = {

  comparator: function (state) {
    return new Date(state.createdAt).valueOf();
  },

  /**
   * getHashchartData
   *
   * Return a list of objects for the area chart
   *
   * @param iterator - twix iterator over a date range
  getHashchartData: function (iterator) {
    var data = [ ];

    var eventsCollection = new this.constructor(this.where({ event: 'ping', success: true }));
    var earliestPing = eventsCollection.at(0).get('createdAt');
    var eventsList = eventsCollection.toJSON();

    for (var x = iterator.next(); iterator.hasNext(); x = iterator.next()) {
      if (x.isBefore(earliestPing)) {
        data.push({
          x: x.toDate(),
          y: 0
        });
      }
      else {
        var index = _.sortedIndex(eventsList, { createdAt: x.toDate() }, this.comparator) - 1;
        var state = eventsCollection.at(index);
        data.push({
          x: x.toDate(),
          y: state.getInstantaneousHashrate()
        });
      }
    }

    return data;
  },
   */
};
