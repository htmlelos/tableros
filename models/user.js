/*global require*/
/*global module*/
var mongoose = require('../models/database');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Usuario = new Schema({
  id: ObjectId,
  email: {type: String, unique: true},
  password: String
});

module.exports = mongoose.model('User', Usuario);
