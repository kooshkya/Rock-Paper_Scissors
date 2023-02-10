// Troughout the code, rocks will be represented by the number 1, paper by the number 2, and scissors by the number 3.
const jediColor1 = "rgb(54, 64, 255)";
const darkSideColor1 = "rgb(255, 54, 54)";

let playerName;
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
    playerName = nameInputField.textContent.trim();
    maskElement.style.display = "none";
}
sidePickButtons.forEach((button) => button.addEventListener("click", sidePickButtonClicked));

// play();

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
