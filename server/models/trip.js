var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CostCategorySchema = require('./costCategory').schema;
var GroceryCategorySchema = require('./groceryCategory').schema;
var MealPlanSchema = require('./mealPlan').schema;
var ItineraryDateSchema = require('./itineraryDate').schema;
var NoteSchema = require('./note').schema;

var TripSchema = new Schema({
  name: { type: String },
  destination: { type: String },
  departure: Date,
  return: Date,
  users: [Schema.Types.ObjectId],
  costs: [CostCategorySchema],
  groceries: [GroceryCategorySchema],
  meals: [MealPlanSchema],
  itinerary: [ItineraryDateSchema],
  notes: [NoteSchema]
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
