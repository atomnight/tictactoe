// marked boxes array
let used_boxes = [];

let winner = 0;

let player1;
let player2;

let first;
let second;

let turn_counter = 1;

let firstRoundPlayer = "";

// players undefined markers
let player_1_marker = "";
let player_2_marker = "";

// all boxes
let boxes = document.getElementsByClassName("box");

// players undefined scores
let player_1_score = 0;
let player_2_score = 0;

// get the root element
let root = document.querySelector(':root');

// get from the second container its main content
let player_info_container = document.querySelector('.player-info-container');
// get from the third container its main content
let info_dice_container = document.querySelector('.info-dice-container');
// get from the fourth container its main content start-game-button
const start_game_button = document.getElementById("start-game-button");
// ========================================================================= //
// get from the second container its game content
let player_info_text = document.querySelector('.player-info-text');
// get from the third container its game content
let game_board_container = document.querySelector('.game-board-container');
// get from the fourth container its game content start-game-button
const round_outcome_h2 = document.getElementById("round-outcome-h2");

// get from the third container its game-over content
let game_over = document.querySelector('.game-over');
// get the h2 that prints the player who won 3 rounds first
let winner_h2 = document.querySelector('.winner');

// get the input fields and input button elements
const player_1_input = document.getElementById("player-1-input");
const player_2_input = document.getElementById("player-2-input");

const player_turn_text = document.getElementById("player-turn-text");

// // button that rolls the dice
// const dice_button = document.getElementById("roll-button");

// h2 tag that prints who plays first after the dice is rolled
const who_goes_first = document.getElementById("say-who-plays-first");




//left and right container with the player's info elements
const player1_name_txt = document.getElementById("player-1-name");
const player1_marker_txt = document.getElementById("player-1-marker");
const player1_score_txt = document.getElementById("player-1-score");

const player2_name_txt = document.getElementById("player-2-name");
const player2_marker_txt = document.getElementById("player-2-marker");
const player2_score_txt = document.getElementById("player-2-score");

// boxes
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const box4 = document.getElementById("box4");
const box5 = document.getElementById("box5");
const box6 = document.getElementById("box6");
const box7 = document.getElementById("box7");
const box8 = document.getElementById("box8");
const box9 = document.getElementById("box9");


// =======================================================
player_info_text.classList.add('game-inactive');
game_board_container.classList.add('game-inactive');
round_outcome_h2.classList.add('game-inactive');

// a factory function for the 2 players
// the name doesn't change but the marker should change every new round
const Player = (name, marker, score, id) => {
    
    const startsFirst = () => {
        if (marker == "X") {
            return true;
        }
    };
    return {name, marker, score, startsFirst, id};
};

// =====================================

start_game_button.addEventListener("click", displayGame);
function displayGame() {
    if (player_1_input.value != "" && player_2_input.value != "" && document.getElementById("roll-button").disabled == true) {
        player_info_container.classList.add('main-inactive');
        info_dice_container.classList.add('main-inactive');
        start_game_button.classList.add('main-inactive');
        root.style.setProperty('--main-display','none');
        root.style.setProperty('--second-container-size','80px');
        root.style.setProperty('--game-display','flex');

        // pass player info
        player1 = Player(player_1_input.value, player_1_marker, player_1_score, 0);
        player2 = Player(player_2_input.value, player_2_marker, player_2_score, 0);

        console.log("player 1 name: " + player1.name);
        console.log("player 1 marker: " + player1.marker);
        console.log("player 1 score: " + player1.score);

        console.log("player 2 name: " + player2.name);
        console.log("player 2 marker: " + player2.marker);
        console.log("player 2 score: " + player2.score);

        if (player1.startsFirst()) {
            player_turn_text.textContent = player1.name + " plays";
            // first = player1;
            // second = player2;
            player1.id = 1;
            player2.id = 2;
        }
        else if (player2.startsFirst()) {
            player_turn_text.textContent = player2.name + " plays";
            // first = player2;
            // second = player1;
            player1.id = 2;
            player2.id = 1;
        }

        player1_name_txt.textContent = "Player 1: " + player1.name;
        player1_marker_txt.textContent = "Marker: " + player1.marker;
        player1_score_txt.textContent = "Score: " + player1.score;   

        player2_name_txt.textContent = "Player 2: " + player2.name;
        player2_marker_txt.textContent = "Marker: " + player2.marker;
        player2_score_txt.textContent = "Score: " + player2.score; 
    }
}

// Listen to all clicks on the document
document.addEventListener('click', function (event) {

	// If the event target doesn't match bail
	if (!event.target.classList.contains('box')) return;

	// if the specific block is already clicked
    let exists = false;
    for (let i = 0; i < used_boxes.length; i++) {
        if (used_boxes[i] == event.target.id) {
            exists = true;
        }
    }
    if (exists != true) {
        round_outcome_h2.textContent = "";
        used_boxes.push(event.target.id);
        // run code when a block is clicked
        play(event.target, player_turn_text, player1, player2);
        gameLogic(turn_counter);
        roundOutcome(player1_score_txt, player2_score_txt, first, second); 
        turn_counter = turn_counter + 1; 
    }
}, false);


// game logic

function play(event_target, player_turn_text, player1, player2) {
    if (player1.id == 1) {
        first = player1;
        second = player2;
    }
    else if (player2.id == 1) {
        first = player2;
        second = player1;
    }
    if (turn_counter == 1) {
        event_target.textContent = "X";
        player_turn_text.textContent = second.name + " plays";
    }
    else if (turn_counter == 2) {
        event_target.textContent = "O"; 
        player_turn_text.textContent = first.name + " plays";
    }
    else if (turn_counter == 3) {
        event_target.textContent = "X";
        player_turn_text.textContent = second.name + " plays"; 
    }
    else if (turn_counter == 4) {
        event_target.textContent = "O"; 
        player_turn_text.textContent = first.name + " plays";
    }
    else if (turn_counter == 5) {
        event_target.textContent = "X"; 
        player_turn_text.textContent = second.name + " plays";
    }
    else if (turn_counter == 6) {
        event_target.textContent = "O"; 
        player_turn_text.textContent = first.name + " plays";
    }
    else if (turn_counter == 7) {
        event_target.textContent = "X"; 
        player_turn_text.textContent = second.name + " plays";
    }
    else if (turn_counter == 8) {
        event_target.textContent = "O"; 
        player_turn_text.textContent = first.name + " plays";
    }
    else if (turn_counter == 9) {
        event_target.textContent = "X"; 
        player_turn_text.textContent = "";
        turn_counter = 0;
    }
}

function gameLogic(turn_counter) {
    if (box1.textContent == "X" && box2.textContent == "X" && box3.textContent == "X") {
        // do stuff when player 1 wins
        return winner = 1;
    }
    else if (box4.textContent == "X" && box5.textContent == "X" && box6.textContent == "X") {
        return winner = 1;    
    }
    else if (box7.textContent == "X" && box8.textContent == "X" && box9.textContent == "X") {
        return winner = 1;
    }
    else if (box1.textContent == "X" && box4.textContent == "X" && box7.textContent == "X") {
        return winner = 1;   
    }
    else if (box2.textContent == "X" && box5.textContent == "X" && box8.textContent == "X") {
        return winner = 1;  
    }
    else if (box3.textContent == "X" && box6.textContent == "X" && box9.textContent == "X") {
        return winner = 1; 
    }
    else if (box1.textContent == "X" && box5.textContent == "X" && box9.textContent == "X") {
        return winner = 1; 
    }
    else if (box3.textContent == "X" && box5.textContent == "X" && box7.textContent == "X") {
        return winner = 1; 
    }
    else if (box1.textContent == "O" && box2.textContent == "O" && box3.textContent == "O") {
        return winner = 2; 
    }
    else if (box4.textContent == "O" && box5.textContent == "O" && box6.textContent == "O") {
        return winner = 2; 
    }
    else if (box7.textContent == "O" && box8.textContent == "O" && box9.textContent == "O") {
        return winner = 2; 
    }
    else if (box1.textContent == "O" && box4.textContent == "O" && box7.textContent == "O") {
        return winner = 2;    
    }
    else if (box2.textContent == "O" && box5.textContent == "O" && box8.textContent == "O") {
        return winner = 2;   
    }
    else if (box3.textContent == "O" && box6.textContent == "O" && box9.textContent == "O") {
        return winner = 2;   
    }
    else if (box1.textContent == "O" && box5.textContent == "O" && box9.textContent == "O") {
        return winner = 2;   
    }
    else if (box3.textContent == "O" && box5.textContent == "O" && box7.textContent == "O") {
        return winner = 2;   
    }
    else if (turn_counter == 0) {
        return winner = 3;
    }
}


function roundOutcome(player1_score_txt, player2_score_txt,first, second) {
    if (winner == 1) {
        // update score
        if (first.name === player1.name) {
            player1.score = player1.score + 1;
            player1_score_txt.textContent = "Score: " + player1.score; 
            round_outcome_h2.textContent = player1.name + " wins!"; 
        }
        else if (first.name === player2.name) {
            player2.score = player2.score + 1;
            player2_score_txt.textContent = "Score: " + player2.score; 
            round_outcome_h2.textContent = player2.name + " wins!";
        }
        // other
        used_boxes = [];
        for (var i = 0, len = boxes.length; i < len; i++) {
            boxes[i].textContent = "";
        }
        turn_counter = 0;
        winner = 0;
        swapMarker(player_turn_text,player1_marker_txt,player2_marker_txt,player1,player2);
        firstTo3(player1,player2);
    }
    else if (winner == 2) {
         // update score
        if (second.name === player1.name) {
            player1.score = player1.score + 1;
            player1_score_txt.textContent = "Score: " + player1.score; 
            round_outcome_h2.textContent = player1.name + " wins!";
        }
        else if (second.name === player2.name) {
            player2.score = player2.score + 1;
            player2_score_txt.textContent = "Score: " + player2.score;
            round_outcome_h2.textContent = player2.name + " wins!"; 
        }
        // other 
        used_boxes = [];
        for (var i = 0, len = boxes.length; i < len; i++) {
            boxes[i].textContent = "";
        }
        turn_counter = 0;
        winner = 0;
        swapMarker(player_turn_text,player1_marker_txt,player2_marker_txt,player1,player2);
        firstTo3(player1,player2);
    }
    else if (winner == 3) {
        round_outcome_h2.textContent = "It's a Tie!"; 
        used_boxes = [];
        for (var i = 0, len = boxes.length; i < len; i++) {
            boxes[i].textContent = "";
        }
        winner = 0;
        swapMarker(player_turn_text,player1_marker_txt,player2_marker_txt,player1,player2);
        firstTo3(player1,player2);
    }   
}

function swapMarker(player_turn_text,player1_marker_txt,player2_marker_txt,player1, player2) {
    if (player1.marker == "X") {
        player1.marker = "O";
        player2.marker = "X";   
        player1_marker_txt.textContent = "Marker: " + player1.marker; 
        player2_marker_txt.textContent = "Marker: " + player2.marker; 
        player_turn_text.textContent = player2.name + " plays";
        player1.id = 2;
        player2.id = 1;
    }
    else if (player2.marker == "X") {
        player1.marker = "X"; 
        player2.marker = "O";
        player1_marker_txt.textContent = "Marker: " + player1.marker; 
        player2_marker_txt.textContent = "Marker: " + player2.marker;
        player_turn_text.textContent = player1.name + " plays";
        player1.id = 1;
        player2.id = 2;
    }
}

function firstTo3(player1, player2) {
    if (player1.score == 3) {
        root.style.setProperty('--game-display','none');
        root.style.setProperty('--game-over-display','flex');
        winner_h2.textContent = player1.name + " won the game!";
    }
    else if (player2.score == 3) {
        root.style.setProperty('--game-display','none');
        root.style.setProperty('--game-over-display','flex');
        winner_h2.textContent = player2.name + " won the game!";
    }
}


// --------------------- Dice code -------------------------

function rollDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach(die => {
      toggleClasses(die);
      dice_outcome = die.dataset.roll = getRandomNumber(1, 6);
    });
    if (dice_outcome == 1 || dice_outcome == 3 || dice_outcome == 5) {
        who_goes_first.textContent = "Player 1 goes first!";
        player_1_marker = "X";
        player_2_marker = "O";
    }
    else if (dice_outcome == 2 || dice_outcome == 4 || dice_outcome == 6) {
        who_goes_first.textContent = "Player 2 goes first!";
        player_1_marker = "O";
        player_2_marker = "X";
    };
    // disable button after one click
    document.getElementById("roll-button").disabled = true;
}

function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("roll-button").addEventListener("click", rollDice);














// const round = (() => {
//     // Build the functions that allow players to add marks to a specific spot on the board,
//     // and then tie it to the DOM, letting players click on the gameboard to place their marker
//     // Don’t forget the logic that keeps players from playing in spots that are already taken!
//     return {};
// })();























