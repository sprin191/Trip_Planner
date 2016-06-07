var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CostCategorySchema = require('./costCategory').schema;
var GroceryCategorySchema = require('./groceryCategory').schema;

var TripSchema = new Schema({
  name: { type: String },
  destination: { type: String },
  departure: Date,
  return: Date,
  users: { type: String },
  costs: [CostCategorySchema],
  groceries: [GroceryCategorySchema]
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
