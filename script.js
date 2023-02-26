// Troughout the code, rocks will be represented by the number 1, paper by the number 2, and scissors by the number 3.
const jediColor1 = "rgb(54, 64, 255)";
const darkSideColor1 = "rgb(255, 54, 54)";
const sithNames = ["Darth Vader", "Darth Maul", "Lord Sidius", "Darth Tyranus"];
const jediNames = ["Qui-Gon Jinn", "Obi-Wan Kenobi", "Anakin Skywalker", "Mace Windu", "Master Yoda"];

let playerName;
let computerName;
let isPlayerJedi;
let playerScore, computerScore, roundNumber;
let playerSide, computerSide;
let playerScoreboard, computerScoreboard;
const playerWeapons = [];
const computerWeapons = [];
const winScore = 3;
const roundDelay = 2000;


initiateGlobalComponents();
initiateEntryMenu();


function initiateGlobalComponents() {
	let errorBox = document.querySelector("#error-box");
	errorBox.querySelectorAll(".error-box-closer").forEach((node) => node.addEventListener("click", () => {errorBox.style.display = "none";}));
}

function initiateEntryMenu() {
    let nameInputField = document.querySelector("#name-field");
	let maskElement = document.querySelector("#mask");
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
}

function initiateArena() {
    playerSide = document.querySelector((isPlayerJedi) ? "#jedi-side" : "#sith-side");
    computerSide = document.querySelector((!isPlayerJedi) ? "#jedi-side" : "#sith-side");
    playerSide.querySelector(".side-header").textContent = playerName;
    computerSide.querySelector(".side-header").textContent = computerName;
    playerScore = 0;
    computerScore = 0;
    playerScoreboard = document.querySelector((isPlayerJedi) ? "#jedi-score" : "#sith-score");
    computerScoreboard = document.querySelector((!isPlayerJedi) ? "#jedi-score" : "#sith-score");
    updateScoreboard();
    let arena = document.querySelector("#arena");
    arena.style.flexDirection = (isPlayerJedi) ? "row" : "row-reverse";
    promptBox = document.querySelector("#prompt-box");
    promptBox.textContent = "Pick Your Weapon!";
    playerSaber = playerSide.querySelector(".saber-weapon")
    playerHand = playerSide.querySelector(".hand-weapon")
    playerBlaster = playerSide.querySelector(".blaster-weapon")
    playerWeapons.push(playerSaber, playerHand, playerBlaster); 
    computerSaber = computerSide.querySelector(".saber-weapon")
    computerHand = computerSide.querySelector(".hand-weapon")
    computerBlaster = computerSide.querySelector(".blaster-weapon")
    computerWeapons.push(computerSaber, computerHand, computerBlaster)
    computerWeapons.forEach((weapon) => {
        weapon.classList.remove("active");
        weapon.disabled = true;
    });
    playerSaber.addEventListener("click", playSaber)
    playerHand.addEventListener("click", playHand)
    playerBlaster.addEventListener("click", playBlaster)    
}

function playSaber() {
    executeRound(1);
}

function playHand() {
    executeRound(2);
}

function playBlaster() {
    executeRound(3);
}


function updateScoreboard() {
    playerScoreboard.textContent = playerScore;
    computerScoreboard.textContent = computerScore;
}

function generateRandomSithName() {
    return sithNames[Math.floor(Math.random() * sithNames.length)];
}
function generateRandomJediName() {
    return jediNames[Math.floor(Math.random() * jediNames.length)];
}

function executeRound(playerMove) {
    disablePlayerButtons();
    playerWeapons[playerMove - 1].classList.add("selected");
    let computerMove = generateRandomMove();
    computerWeapons[computerMove - 1].classList.add("selected");
    let winner = determineWinner(playerMove, computerMove);

    if (winner !== "Draw") {
        promptBox.textContent = winner + " Wins the round!";
    } else {
        promptBox.textContent = "Draw!";
    } 
    roundNumber++;
    playerScore += (winner === playerName) ? 1 : 0;
    computerScore += (winner === "Computer") ? 1 : 0;
    
    // TODO: check scores and end the game if appropriate

    
    setTimeout(() => {
        playerWeapons[playerMove - 1].classList.remove("selected");
	    computerWeapons[computerMove - 1].classList.remove("selected");
	    enablePlayerButtons();
    }, roundDelay);
}

function enablePlayerButtons() {
    playerWeapons.forEach((w) => {
        w.disabled = false;
        w.classList.add("active");
    });
}

function disablePlayerButtons() {
    playerWeapons.forEach((w) => {
        w.disabled = true;
        w.classList.remove("active");
    });
}

function play() {
    playerScore = 0, computerScore = 0;
    roundNumber = 1;
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
            result = computerName;
            break;
    }
    return result;
}

function convertMoveToString(move) {
    let stringMove;
    switch (move) {
        case 1:
            stringMove = "Saber";
            break
        case 2:
            stringMove = "The Force";
            break;
        case 3:
            stringMove = "Blaster";
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
