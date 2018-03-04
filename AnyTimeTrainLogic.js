

var config = {
    apiKey: "AIzaSyDahRUFRxLZ5zKkyxXA8h0tT8TEeu6u1fM",
    authDomain: "anytimetrain-1f631.firebaseapp.com",
    databaseURL: "https://anytimetrain-1f631.firebaseio.com",
    projectId: "anytimetrain-1f631",
    storageBucket: "anytimetrain-1f631.appspot.com",
    messagingSenderId: "370901429650"
  };

firebase.initializeApp(config);

  var database = firebase.database();


// 2. Button for adding Trains

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

//Grabs user input
  var trainNm = $("#trainNameInput").val().trim();
  var trainDest = $("#destinationInput").val().trim(); 
  var trainFirst = $("#firstTimeInput").val().trim();
  var trainFreq = $("#frequencyInput").val().trim();
   
    // Creates local "temporary" object for holding employee data
  
   var newTrain = {
       trainName: trainNm,
       destination: trainDest,
       firstTimeTrain: trainFirst,
       frequency: trainFreq
      };

  // Uploads train data to the database
  
database.ref().push(newTrain);

  // Logs everything to console

  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.firstTimeTrain);
  console.log(newTrain.frequency);
  
 

  // Alert
   // alert("Train successfully added");
  // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTimeInput").val("");
    $("#frequencyInput").val("");
  
 });
// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());
  // Store everything into a variable.

  var trainNm = childSnapshot.val().trainName;
  var trainDest = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().firstTimeTrain;
  var trainFreq = childSnapshot.val().frequency;
      

  // Employee Info
 
  console.log(trainNm);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFreq);

   

  // Calculate the train arrival and minutes away
  //Calculate the train arrival

  var time = moment(trainFirst, "HH:mm").subtract(1, "years");
    console.log(time);

  var timeNow = moment();
    console.log("CURRENT TIME: " + moment(timeNow).format("HH:mm"));

  var diffTime = moment().diff(moment(time), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

  var remainder = diffTime % trainFreq;
    console.log(remainder);

  var minutesAway = trainFreq - remainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

  var nextTrain = moment().add(minutesAway, "minutes");
  var nextArrival = moment(nextTrain).format("HH:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

 $("#train-table > tbody").append("<tr><td>" + trainNm + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + nextArrival + "</td><td>" + minutesAway +"</td></tr>" );
  });
  
