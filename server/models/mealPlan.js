var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MealPlanSchema = new Schema({
  date: Date,
  breakfast: { type: String },
  lunch: { type: String },
  dinner: { type: String }
});

var MealPlan = mongoose.model('MealPlan', MealPlanSchema);

module.exports = MealPlan;
