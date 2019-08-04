//*Handles gameboard */

const gameBoard = (() => {
    const show = ['', '', '','', '', '','', '', ''];
    const mark = (index, mark) => (checkMoveValid(index)) ? show[index] = mark : false;
    const checkMoveValid = (index) => (show[index] === '') ? true : false;
    const reset = () => {
        show.forEach((element, index) => show[index] = '');
    };
    return {
        mark,
        checkMoveValid,
        show,
        reset,
    };
})();

//** Player */

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol,}
}

//** Handles display */

const displayController = (() => {
    const board = document.querySelectorAll('.box');
    const resetBTN = document.querySelector('.resetBTN');
    const startBTN = document.querySelector('.startBTN');
    const gamemodeAI = document.getElementById('AI1');
    const gamemodeAI2 = document.getElementById('AI2');
    const gamemodePvP = document.getElementById('PvP');
     
    const gameListeners = () => {
        resetBTN.addEventListener('click', game.reset)
        startBTN.addEventListener('click', game.start)
        
        board.forEach( function(element) {            
            element.addEventListener('click', () => game.playTurn(element));
        });
    };
    
    const getGameMode = () => {
        if (gamemodeAI.checked) return gamemodeAI.id
        if (gamemodeAI2.checked) return gamemodeAI2.id
        if (gamemodePvP.checked) return gamemodePvP.id
    }

    const reset = () => {
        board.forEach( function(element) {
            element.innerHTML = '';
        });
    }


    return {
        gameListeners,
        getGameMode,
        reset,
    };
})();

//** Handles Game */

const game = (() => {
    let gameOn = false;
    let turns = 0;    
    const playerOne = Player('You', 'O');
    const playerTwo = Player('AI', 'X');
    let currentPlayer = playerOne;
    let gameMode = displayController.getGameMode();

    const swapCurrentPlayer = () => 
        (game.currentPlayer === playerOne) ? game.currentPlayer = playerTwo: game.currentPlayer = playerOne;
    
    const start = () => {
        reset();
        gameOn = true;
        console.log(gameOn)
    }

    const reset = () => {
        gameBoard.reset();
        displayController.reset();
        turns = 0;
        gameOn = false;
    }

    const playTurn = (element) => {
        if(!gameOn) return;

        //Checks for valid move then marks square and swaps players
        if(gameBoard.checkMoveValid(element.id)) {
            element.innerHTML = game.currentPlayer.getSymbol();
            gameBoard.mark((element.id), game.currentPlayer.getSymbol())            
            turns ++;
        //Checks if theres a winner   
            if (checkForWinner()) {
                console.log('YOU WON')
            } else if(turns == 9) {
                console.log('YOU TIE!');                
            } else {
        //will need computer move here
            }
            swapCurrentPlayer();
        }
        
    }

    const checkForWinner = () => {
        let board = gameBoard.show;
        let playerPicks = [];
        let computerPicks = [];
        const winningParameters = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        let check = function (winArr, arrCheck) {
                return winArr.every(j => arrCheck.includes(j));
            }

    //Loop through gameboard to get all the indexes of the pieces for both players  
        for(let i = 0; i < board.length; i ++)
            if(board[i] === 'O') {
                playerPicks.push(i);
            } else if(board[i] === 'X') {
                computerPicks.push(i);
            }
    //Loop through Win parameters to see if theres a winner
        for(let i = 0; i < winningParameters.length; i++) {
            let checkArray = winningParameters[i]
            
            if (check(checkArray, playerPicks) || check(checkArray, computerPicks) ) {
                return true
            } 
       }
    }

    return {
        swapCurrentPlayer,
        currentPlayer,
        reset,
        gameMode,
        playTurn,
        checkForWinner,
        start,
    };
})();

displayController.gameListeners();

//reminders
//Add win and tie 
//add computer move ability