// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var sid = require("shortid");



// Sets up the Express App
// =============================================================
var app = express();

var cApp = express();
var CPORT = process.env.PORT || 3001;

var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

cApp.use(bodyParser.urlencoded({ extended: false }));
cApp.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var reservation = [
  {
    name: "Fernando von Hapsburg",
    time: "6:00pm",
    phone: "200-099-9999",
    uID: sid.generate()
  },
  {
    name: "John von Ranck",
    time: "7:00pm",
    phone: "200-099-9999",
    uID: sid.generate()
  },
  {
    name: "Ben High",
    time: "4:20pm",
    phone: "200-099-9999",
    uID: sid.generate()
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", function(req, res) {
  res.sendFile(path.join(__dirname, "all.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:reservation?", function(req, res) {
  var chosen = req.params.reservation;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservation.length; i++) {
      var temp = reservation[i].name.replace(/\s+/g, "").toLowerCase();
      if (chosen === temp ) {
        return res.json(reservation[i]);
      }
    }

    return res.json(false);
  }
  return res.json(reservation);
});

// Create New Characters - takes in JSON input
app.post("/api/newReservation", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  newReservation.uID = sid.generate();
 
  console.log(newReservation);

  reservation.push(newReservation);

  res.json(newReservation);
});

cApp.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "cAdd.html"));
});

cApp.post("/api/newReservation", function(req, res) {
  app.post("/api/newReservation", newReservation)
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


cApp.listen(CPORT, function() {
  console.log("App listening on PORT " + CPORT);
});
