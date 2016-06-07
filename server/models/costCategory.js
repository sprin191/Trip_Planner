var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CostItemSchema = require('./costItem').schema;

var CostCategorySchema = new Schema({
  category: { type: String },
  items: [CostItemSchema]
});

var CostCategory = mongoose.model('CostCategory', CostCategorySchema);

module.exports = CostCategory;
