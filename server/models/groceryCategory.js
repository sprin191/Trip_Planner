var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GroceryItemSchema = require('./groceryItem').schema;

var GroceryCategorySchema = new Schema({
  category: { type: String },
  items: [GroceryItemSchema]
});

var GroceryCategory = mongoose.model('GroceryCategory', GroceryCategorySchema);

module.exports = GroceryCategory;
