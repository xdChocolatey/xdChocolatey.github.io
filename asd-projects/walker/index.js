/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  }
  var walker = { //TODO 4
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
  }

  // Game Item Objects

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);                               //TODO 7, once the key is released, the movement stops

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision(); //TODO 8
    redrawGameItem();
    //document.getElementById("walker").innerText = JSON.stringify(walker)
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    //console.log("Keycode:" , event.keyCode);  //TODO 2: either put a ',' or a '+'  
    //TODO 3
    if (event.which === KEY.LEFT) {
      walker.speedX = -5; //TODO 6
      walker.speedY = 0;  //stops up and down movement
      // alert("left pressed");
    }
    if (event.which === KEY.UP) {
      walker.speedX = 0;  //stops sideways movement
      walker.speedY = -5;  //up is negative
      console.log("up pressed");
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
      walker.speedY = 0;
      console.log("right pressed");
    }
    if (event.which === KEY.DOWN) {
      walker.speedX = 0;
      walker.speedY = 5;  //down is positive
      console.log("down pressed");
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  //TODO 5 BELOW
  function repositionGameItem() {
    walker.positionX += walker.speedX;
    walker.positionY += walker.speedY;
  }

  function redrawGameItem() {
    $("#walker").css("left", walker.positionX);
    $("#walker").css("top", walker.positionY);
  }

  function handleKeyUp() {  //TODO 7
    walker.speedX = 0;
    walker.speedY = 0;
  }

  function wallCollision() {  //TODO 8
    var boardWidth = 392
    var boardHeight = 392

    //CAN'T GO FURTHUR LEFT
    if (walker.positionX < 0) {  //if the position is less than 0, it makes it 0 and can't go back
      walker.positionX = 1;

    } if (walker.positionX > boardWidth) {
      walker.positionX = boardWidth;  //makes the position equal 0 or the boardWidth
    }

    //CAN'T GO FURTHUR UP
    if (walker.positionY < 0) {
      walker.positionY = 1;
    } else if (walker.positionY > boardHeight) {
      walker.positionY = boardHeight;
    }
  }
}