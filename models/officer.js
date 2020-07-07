const mongoose = require('mongoose');

const officerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  free: Boolean,
  case: String,
});
module.exports = mongoose.model('Officer', officerSchema);
