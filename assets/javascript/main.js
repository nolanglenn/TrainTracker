// Initialize Firebase
var config = {
    apiKey: "AIzaSyDNZBPivY17_Nd5bYfq3cG6emrI3Fpde_0",
    authDomain: "traintracker-4430b.firebaseapp.com",
    databaseURL: "https://traintracker-4430b.firebaseio.com",
    projectId: "traintracker-4430b",
    storageBucket: "",
    messagingSenderId: "549095985661"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTime = moment($("#first-time-input").val().trim()).format("HH:mm");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    train: trainName,
    destination: destination,
    start: firstTime,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  console.log("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().start;
  var frequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTime);
  console.log(frequency);

  // Prettify the train start
  

  // Calculate time away and such
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);
  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

//   var nextTrainPretty = moment.unix(nextTrain).format("HH:mm");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text("--")
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

var timeDifference = function() {
    var tFrequency = $("#frequency-input").val().trim();
    // Time is 3:30 AM
    var firstTime = $("#first-time-input").val().trim();
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
};
