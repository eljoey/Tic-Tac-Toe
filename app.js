//*Handles gameboard */

const gameBoard = (() => {
    const board = ['', '', '','', '', '','', '', ''];
//change 'x' in markBoard to player.mark after player factory set up
    const mark = (index, mark) => (checkMoveValid(index)) ? board[index] = mark : false;
    const checkMoveValid = (index) => (board[index] === '') ? true : false;
    const reset = () => {
        board.forEach((element, index) => board[index] = '');
    };
    return {
        mark,
        checkMoveValid,
        board,
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
            element.addEventListener('click', () => gameBoard.mark((element.id - 1), game.currentPlayer.getSymbol()));
            element.addEventListener('click', () => (element.innerHTML = game.currentPlayer.getSymbol()));
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

const game = (() => {
    const winningParameters = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    const playerOne = Player('You', 'O');
    const playerTwo = Player('AI', 'X');
    let currentPlayer = playerOne;

    const setGameMode = () => displayController.getGameMode();

    const swapCurrentPlayer = () => {
        if(currentPlayer === playerOne) {
            currentPlayer = playerTwo;
            console.log(currentPlayer.name)
        } else {
            currentPlayer = playerOne;
            console.log(currentPlayer.name)
        }
    };
    
    const reset = () => {
        gameBoard.reset();
        displayController.reset();
    }

    return {
        setGameMode,
        playerOne,
        swapCurrentPlayer,
        currentPlayer,
        reset,
    };
})();


//reminders
//playermark used for event listeners
//game.reset event listener for reset button
let playermark = 'x';
let compmark = 'o';