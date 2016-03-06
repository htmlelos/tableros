/*global require*/
/*global module*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/colgate');

module.exports = mongoose;
