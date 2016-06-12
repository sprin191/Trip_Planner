var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItineraryActivitySchema = new Schema({
  activity: {type: String}
});

var ItineraryActivity = mongoose.model('ItineraryActivity', ItineraryActivitySchema);

module.exports = ItineraryActivity;
