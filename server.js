// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var reservation = [
  {
    reservationName: "Mr. von Hapsburg",
    name: "Fernando von Hapsburg",
    date: "11/10/2017",
    time: "6:00pm"
  },
  {
   reservationName: "Mr. von Ranck",
    name: "John von Ranck",
    date: "11/11/2017",
    time: "7:00pm"
  },
  {
    reservationName: "Mr. High",
    name: "Ben High",
    date: "4/20/2020",
    time: "4:20pm"
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
      if (chosen === reservation[i].routeName) {
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

  console.log(newReservation);

  reservation.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
