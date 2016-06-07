var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CostItemSchema = new Schema({
  expense_name: {type: String},
  cost: {type: Number}
});

var CostItem = mongoose.model('CostItem', CostItemSchema);

module.exports = CostItem;
