/*
We store our game status element here to allow us to more easily 
use it later on 
*/
const statusDisplay = document.querySelector(".game--status");
/*
Here we declare some variables that we will use to track the 
game state throught the game. 
*/
/*
We will use gameActive to pause the game in case of an end scenario
*/
let gameActive = true;
/*
We will store our current player here, so we know whos turn 
*/
let players = ["X", "O"];
let currentPlayer = "X";
/*
We will store our current game state here, the form of empty strings in an array
 will allow us to easily track played cells and validate the game state later on
*/
let gameState = ["", "", "", "", "", "", "", "", ""];
/*
Here we have declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with 
current data every time we need it.
*/
function winningMessage() {
  if (currentPlayer == "X") {
    return `Player ${players[0]} has won!`;
  } else {
    return `Player ${players[1]} has won!`;
  }
}

const drawMessage = () => `Game ended in a draw!`;
function currentPlayerTurn() {
  if (currentPlayer == "X") {
    return `It's ${players[0]}'s turn`;
  } else {
    return `It's ${players[1]}'s turn`;
  }
}
/*
We set the inital message to let the players know whose turn it is
*/
statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed() {}
function handlePlayerChange() {}
function handleResultValidation() {}
function handleCellClick() {}
function handleRestartGame() {}
/*
And finally we add our event listeners to the actual game cells, as well as our 
restart button
*/
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);
function handleCellClick(clickedCellEvent) {
  /*
    We will save the clicked html element in a variable for easier further use
    */
  const clickedCell = clickedCellEvent.target;
  /*
    Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid. 
    Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an 
    integer(number)
    */
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );
  console.log(istBereitsBelegt(clickedCell));
  /* 
    Next up we need to check whether the call has already been played, 
    or if the game is paused. If either of those is true we will simply ignore the click.
    */
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  /* 
    If everything if in order we will proceed with the game flow
    */
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  /*
        We update our internal game state to reflect the played move, 
        as well as update the user interface to reflect the played move
        */

  var hintergrund = document.getElementById("body");
  if (currentPlayer === "X" && clickedCell.innerHTML === "") {
    clickedCell.className = "cell blue";
    hintergrund.style.backgroundColor = "red";
  }
  if (currentPlayer === "O" && clickedCell.innerHTML === "") {
    clickedCell.className = "cell red";
    hintergrund.style.backgroundColor = "blue";
  }
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    document.getElementById("melone").style.visibility = "visible";
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  } else {
    document.getElementById("melone").style.visibility = "hidden";
  }

  /* 
        We will check weather there are any values in our game state array 
        that are still not populated with a player sign
        */
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  /*
        If we get to here we know that the no one won the game yet, 
        and that there are still moves to be played, so we continue by changing the current player.
        */
  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  var hintergrund = document.getElementById("body");
  hintergrund.style.backgroundColor = "blue";
  document.getElementById("melone").style.visibility = "hidden";
  document.getElementById("todo_input1").disabled = false;
  document.getElementById("todo_input2").disabled = false;
}
var melone = document.getElementById("melone");
// melone.addEventListener('mouseover', ()=>{melone.style.width = "2%"})
// melone.addEventListener('mouseleave', ()=>{melone.style.width = "50%"})

var todo_ul = document.getElementById("todo_ul");

function zufall() {
  var min = 1;
  var max = 2;
  var zufallszahl = Math.round(Math.random() * (max - min)) + min;
  if (zufallszahl == 1) {
    currentPlayer = "X";
  } else {
    currentPlayer = "O";
  }
  statusDisplay.innerHTML = currentPlayerTurn();
  var currentPlayerBox = document.getElementById("currentPlayerBox");
  currentPlayerBox.innerHTML = currentPlayerTurn();
}
function hinzufuegen(i) {
  console.log(i);
  if (i == 1) {
    var todo_input = document.getElementById("todo_input1");
    let input = todo_input.value;
    players[0] = input;
  } else {
    var todo_input = document.getElementById("todo_input2");
    let input = todo_input.value;
    players[1] = input;
    if (todo_input) {
      document.getElementById("todo_input1").disabled = true;
    } else {
      document.getElementById("todo_input1").disabled = false;
    }
    if (todo_input) {
      document.getElementById("todo_input2").disabled = true;
    } else {
      document.getElementById("todo_input2").disabled = false;
    }
  }
  statusDisplay.innerHTML = currentPlayerTurn();
  console.log(players);
}

function leseSpielfeld() {
  console.log(
    document.getElementsByClassName("game--container")[0].children[0]
  );
}

function zufallsFeld() {
  var min = 0;
  var max = 8;
  var zufallsBlock = Math.round(Math.random() * (max - min)) + min;
  return zufallsBlock;
}

function istBereitsBelegt(feld) {
  if (feld.innerHTML === "") {
    return false;
  } else {
    return true;
  }
}

function zahlenAddieren(zahl1, zahl2) {
  return zahl1 + zahl2;
}
var hi = [5, 4, 6, 7, 8];
function zahlenlisteAddieren(liste) {
  var summe = 0;
  for (var i = 0; i < liste.length; i++) {
    summe = summe + liste[i];
  }
  return summe;
}
console.log(zahlenlisteAddieren(hi));

function spieler() {
  document.getElementById("alles").style.visibility = "visible";
}

function bot() {
  document.getElementById("alles").style.visibility = "visible";
}
