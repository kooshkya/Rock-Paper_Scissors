// Troughout the code, rocks will be represented by the number 1, paper by the number 2, and scissors by the number 3.
const jediColor1 = "rgb(54, 64, 255)";
const darkSideColor1 = "rgb(255, 54, 54)";
const sithNames = ["Darth Vader", "Darth Maul", "Lord Sidius", "Darth Tyranus"];
const jediNames = ["Qui-Gon Jinn", "Obi-Wan Kenobi", "Anakin Skywalker", "Mace Windu", "Master Yoda"];

let playerName;
let computerName;
let isPlayerJedi;
let playerScore, computerScore, roundNumber;
const winScore = 3;

let nameInputField = document.querySelector("#name-field");
let maskElement = document.querySelector("#mask");
let errorBox = document.querySelector("#error-box");
errorBox.querySelectorAll(".error-box-closer").forEach((node) => node.addEventListener("click", () => {errorBox.style.display = "none";}));
let sidePickButtons = document.querySelectorAll("#start-form-button-container > input");
let sidePickButtonClicked = (e) => {
    if (e.target.id !== "dark-button" && e.target.id !== "jedi-button") {
        return;
    }
    if (nameInputField.value.trim() === "") {
        errorBox.style.display = "flex";
        errorBox.querySelector("p#error-box-message").textContent = "You need a name to play!";
        errorBox.style.backgroundColor = (e.target.id === "dark-button") ? darkSideColor1 : jediColor1;
        return;
    }
    isPlayerJedi = (e.target.id === "jedi-button");
    document.querySelector("body").style.cursor = `url("images/${isPlayerJedi ? "blue" : "red"}.png"), pointer`;
    playerName = ((isPlayerJedi) ? "" : "Darth ") + nameInputField.value.trim();
    computerName = (isPlayerJedi) ? generateRandomSithName() : generateRandomJediName();
    maskElement.style.display = "none";

    initiateArena();
}
sidePickButtons.forEach((button) => button.addEventListener("click", sidePickButtonClicked));
promptBox = document.querySelector("#prompt-box");
promptBox.textContent = "Pick Your Weapon!";

function initiateArena() {
    playerSide = document.querySelector((isPlayerJedi) ? "#jedi-side" : "#sith-side");
    computerSide = document.querySelector((!isPlayerJedi) ? "#jedi-side" : "#sith-side");
    playerSide.querySelector(".side-header").textContent = playerName;
    computerSide.querySelector(".side-header").textContent = computerName;
    let arena = document.querySelector("#arena");
    arena.style.flexDirection = (isPlayerJedi) ? "row" : "row-reverse";
    
}

// play();

function generateRandomSithName() {
    return sithNames[Math.floor(Math.random() * sithNames.length)];
}
function generateRandomJediName() {
    return jediNames[Math.floor(Math.random() * jediNames.length)];
}


function play() {
    playerScore = 0, computerScore = 0;
    roundNumber = 1;
    playerName = prompt("Welcome to RPS! Please enter your name:");
    if (playerName == "Computer") {
        playerName = "Player";
    }
    while (playerScore < winScore && computerScore < winScore) {
        let playerMove = getPlayerMove();
        if (playerMove === -1) {
            alert("Invalid input, try again.");
            continue;
        }
    
        let computerMove = generateRandomMove();
        let winner = determineWinner(playerMove, computerMove);
    
        let roundMessage = `${playerName}'s Move: ${convertMoveToString(playerMove)}\n`
        roundMessage += `Computer's Move: ${convertMoveToString(computerMove)}\n`
        roundMessage += (winner !== "Draw") ? `Winner: ${winner}` : "Draw!";
        alert(roundMessage);
    
        roundNumber++;
        playerScore += (winner === playerName) ? 1 : 0;
        computerScore += (winner === "Computer") ? 1 : 0;
    }
    
    endGame();
    play();
}


function endGame() {
    winner = (playerScore == winScore) ? playerName : "Computer";
    alert(`${winner} Won! click OK to restart game!`);
}


function determineWinner(player, computer) {
    // Returns as string the name of the winner
    let result;
    let moves = String(player) + String(computer);
    switch (moves) {
        case "11":
        case "22":
        case "33":
            result = "Draw";
            break;
        case "13":
        case "21":
        case "32":
            result = playerName;
            break;
        default:
            result = "Computer";
            break;
    }
    return result;
}

function convertMoveToString(move) {
    let stringMove;
    switch (move) {
        case 1:
            stringMove = "Rock";
            break
        case 2:
            stringMove = "Paper";
            break;
        case 3:
            stringMove = "Scissors";
            break;
    }
    return stringMove;
}

function generateRandomMove() {
    return Math.floor(Math.random() * 3) + 1;
}

function getPlayerMove() {
    let promptString = `${playerName}: ${playerScore}   =======   Computer: ${computerScore}\n`
    promptString += `Round ${roundNumber}\nplease enter your move:`;
    let playerMove = prompt(promptString);
    switch (playerMove.charAt(0).toLowerCase()) {
        case '1':
        case 'r':
            playerMove = 1;
            break;
        case '2':
        case 'p':
            playerMove = 2;
            break;
        case '3':
        case 's':
            playerMove = 3;
            break;
        default:
            playerMove = -1;
            break;
    }
    return playerMove;
}
