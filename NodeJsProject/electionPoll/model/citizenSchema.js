/**
 * To create the schema of the database 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 


var citizenSchema = new Schema({
    voterId  : String,
    password :String,
    voterStatus   : Boolean 
});

/**
 * Creating a singleton entry point User
 */

var Citizen = mongoose.model("CitizenTable", citizenSchema);
module.exports = Citizen;