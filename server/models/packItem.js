var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackItemSchema = new Schema({
  name: {type: String},
  packed: {type: Boolean}
});

var PackItem = mongoose.model('PackItem', PackItemSchema);

module.exports = PackItem;
