var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PackItemSchema = require('./packItem').schema;

var PackCategorySchema = new Schema({
  category: { type: String },
  items: [PackItemSchema]
});

var PackCategory = mongoose.model('PackCategory', PackCategorySchema);

module.exports = PackCategory;
