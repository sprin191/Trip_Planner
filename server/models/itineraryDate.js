var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ItineraryActivitySchema = require('./itineraryActivity').schema;

var ItineraryDateSchema = new Schema({
  date: Date,
  activities: [ItineraryActivitySchema]
});

var ItineraryDate = mongoose.model('ItineraryDate', ItineraryDateSchema);

module.exports = ItineraryDate;
