const mongoose = require('mongoose');

const caseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  case: String,
  resolved: Boolean,
  officer: String,
});
module.exports = mongoose.model('Case', caseSchema);
