// Troghout the code, rocks will be represented by the number 1, paper by the number 2, and scissors by the number 3.

let name = prompt("Welcome to RPS! Please enter your name:");
let playerScore = 0, computerScore = 0, roundNumber = 1;
const winScore = 3;
while (playerScore < winScore && computerScore < winScore) {
    let playerMove = getPlayerMove();
    if (playerMove === -1) {
        alert("Invalid input, try again.");
        continue;
    }

    let computerMove = generateRandomMove();


    alert(
        `Your Move: ${convertMoveToString(playerMove)}\nComputer's Move: ${convertMoveToString(computerMove)}\nWinner: ${winner}`
        );

    alert(`Player Move: ${playerMove}`)
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
}

function generateRandomMove() {
    return Math.floor(Math.random() * 3) + 1;
}

function getPlayerMove() {
    let playerMove = prompt(`Round ${roundNumber}, please enter your move:`);
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