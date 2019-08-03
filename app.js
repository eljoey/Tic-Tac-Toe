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

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol}
}

const displayController = (() => {
    const board = document.querySelectorAll('.box');
    const resetBTN = document.querySelector('.resetBTN')
    const gamemodeAI = document.getElementById('AI1');
    const gamemodeAI2 = document.getElementById('AI2');
    const gamemodePvP = document.getElementById('PvP');
     
    const gameListeners = () => {
        board.forEach( function(element) {
            element.addEventListener('click', () => gameBoard.mark((element.id - 1), playermark));
            element.addEventListener('click', () => element.innerHTML = playermark);
        });
       
        resetBTN.addEventListener('click', game.reset())
    };
    
    const getGameMode = () => {
        if (gamemodeAI.checked) return gamemodeAI.id
        if (gamemodeAI2.checked) return gamemodeAI2.id
        if (gamemodePvP.checked) return gamemodePvP.id
    }


    return {
        gameListeners,
        getGameMode,

    };
})();

const game = () => {
};


//reminders
//playermark used for event listeners
//game.reset event listener for reset button
let playermark = 'x';
let compmark = 'o';