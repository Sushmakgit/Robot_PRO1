/**
 * To create the schema of the database 
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var candidateSchema = new Schema({
    candidateParty  : String,
    noOfVotes   : Number 
});

/**
 * Creating a singleton entry point User
 */
var Candidate= mongoose.model("CandidateTable", candidateSchema);
module.exports = Candidate;
