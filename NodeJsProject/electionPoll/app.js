/**
 * Program to inculcate Voting sYSTEM
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config/config'); // get our config file
app.set('superSecret', config.secret)

var idv;
var Citizen = require('./model/citizenSchema'); // to access database
let Candidate = require('./model/candidateSchema'); // to access database
var port = 4003; // Assigning Port Number

app.set('view engine', 'ejs');  //Setting the view Engine
let voterId;

/** 
 *  using body parser to get the info from POST and/or URL parameters
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** 
 *  get an instance of the router for api routes
 */
var apiRoutes = express.Router();

/**
 * To add an image
 */
var publicdir = require('path').join(__dirname, '/public');
app.use(express.static(publicdir));

/**
 * Fetching the home page
 */
app.get('/api', (req, res) => {
  Citizen.find({}, function (err, obj) {
    if (err) throw err;
    else {
      res.render("index");
    }
  })
});

/**
 * Updating the datsbase with new values
 */
app.post('/addData', (req, res) => {
  var add = new Citizen({ voterId: req.body.vid, password: req.body.psw, voterStatus: false });
  add.save(function (err, obj) {
    if (err) throw err
    else {
      console.log(obj);
      console.log("Done");
      res.send("login credentials updated");
    }
  });
});

/**
 * Rendering the code to display Charts
 */
app.get('/home', (req, res) => {
  res.render("chartIndex")
});

/**
 * Fetching the values from the database to execute chart
 */
app.get('/chart/fget', (req, res) => {
  console.log("In ajax");
  Candidate.find({}, { _id: 0, __v: 0 }, function (err, obj) {
    if (err) {
      res.send(err);
    }
    else {
      console.log(obj);
      res.json(obj);
    }
  });
})

/**
 * Rendering the page which diaplays voting panel
 */
app.get('/page2', (req, res) => {
  res.render("page2");
})


/** 
 * route to authenticate a user
 **/
app.post('/authenticate', function (req, res) {
  voterId = req.body.vid;
  voterStatus = req.body.voterStatus;
  Citizen.findOne({
    voterId: req.body.vid,
    password: req.body.psw
  },
    function (err, cit) {
      if (err) throw err;
      if (!cit) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (cit) {        
        if (cit.password != req.body.psw) {   // check if password matches
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          const payload = {
            admin: cit.voterId
          };
          var token = jwt.sign(payload, app.get('superSecret'), {
            expiresIn: 1440
          });
          console.log(token);    // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            id: voterId
          });
        }
      }
    });
});

/**
 * Fetching the selected values and incrementing the votes in the database
 */
app.post('/addVote', function (req, res) {
  var num1 = { candidateParty: req.body.candidateParty }
  console.log(num1);
  Candidate.findOne(num1, function (err, obj) {
    if (!err) {
      console.log("candidate obj", obj);
      Citizen.find({ voterId: req.body.idv }, function (err, data) {
        if (err) {
          console.log("error in find", err);
        } else {
          console.log("find data", data);
          if (data[0].voterStatus == true) {    //If the status is false only then the voter is allowed to vote
            console.log("You have already voted");
            res.send("You have already voted");
          } else {
            if (obj != null) {
              Candidate.updateOne(num1, { $inc: { noOfVotes: +1 } }, function (err, obj) {
                if (err) throw err;
                else
                  console.log(obj);
              });
              console.log("ente in ")
              Citizen.updateOne({ voterId: voterId }, { $set: { voterStatus: true } }, function (err, obj) {
                if (err) throw err;
                else {
                  console.log(obj);
                }
              });
            }
            res.send("Thanks for voting")
          }
        }
      })
    }
    else {
      console.log("error in finding candidates");
    }
  })
})

/**
 * Verifying the credentials
 */
app.use('/verify', function (req, res, next) {
  console.log(req.headers.tok);
  var token = req.headers.tok;

  // decode token
  if (token) {
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        console.log("LOGIN DONE")
        console.log(decoded)
        res.locals.uid = decoded.admin
        next();
        req.decoded = decoded;
      }
    });

  }
  else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
})

/** 
*To verify the given username and password  with the entries in the database
*/
app.get('/verify', function (req, res) {
  console.log(res.locals.uid)
  var name = res.locals.uid;
  res.render('page2', { vid: name });
})

/**
 * Listening on the particular port
 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
