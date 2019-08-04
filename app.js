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
    const resetBTN = document.querySelector('.resetBTN')
    const gamemodeAI = document.getElementById('AI1');
    const gamemodeAI2 = document.getElementById('AI2');
    const gamemodePvP = document.getElementById('PvP');
     
    const gameListeners = () => {
        resetBTN.addEventListener('click', game.reset)
        
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
    let turns = 0;
    const winningParameters = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    const playerOne = Player('You', 'O');
    const playerTwo = Player('AI', 'X');
    let currentPlayer = playerOne;
    let gameMode = displayController.getGameMode();

    const swapCurrentPlayer = () => 
        (game.currentPlayer === playerOne) ? game.currentPlayer = playerTwo: game.currentPlayer = playerOne;
    
    const reset = () => {
        gameBoard.reset();
        displayController.reset();
        turns = 0;
    }

    const playTurn = (element) => {
        //Checks for valid move then marks square and swaps players
        if(gameBoard.checkMoveValid(element.id)) {
            element.innerHTML = game.currentPlayer.getSymbol();
            gameBoard.mark((element.id), game.currentPlayer.getSymbol())
            swapCurrentPlayer();
            turns ++;
        //Checks if theres a winner   
            if (checkForWinner()) {
                console.log('YOU WON')
                game.reset();
            } else if(turns == 9) {
                console.log('YOU TIE!');                
            } else {
            }

        }
        
    }

    const checkForWinner = () => {
        let board = gameBoard.show;
        let playerCheck = [];
    //Loop through gameboard to get all the indexes of 'O'  
        for(let i = 0; i < board.length; i ++)
            if(board[i] === 'O') {
                playerCheck.push(i);
            }
    //Loop through Win parameters to see if player won
        for(let i = 0; i < game.winningParameters.length; i ++) {
            let checkArray = game.winningParameters[i]
            let check = function (checkArray, playerCheck) {
                return checkArray.every(j => playerCheck.includes(j));
            }
            if (check(checkArray, playerCheck)) {
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
        winningParameters,
    };
})();


//reminders
//check for winners not done got players check done. finish comp check
//Add win and tie 