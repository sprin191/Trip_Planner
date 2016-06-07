var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroceryItemSchema = new Schema({
  name: {type: String},
  purchased: {type: Boolean}
});

var GroceryItem = mongoose.model('GroceryItem', GroceryItemSchema);

module.exports = GroceryItem;
