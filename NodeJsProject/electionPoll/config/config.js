/**
 * To connect to the database
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Mongo db started");
});
module.exports = {
  'secret': 'JWTsecret',
  'database' : 'mongodb://localhost/test'
};
