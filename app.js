const gameBoard = (() => {
    const board = ['', '', '','', '', '','', '', ''];
//change 'x' in markBoard to player.mark after player factory set up
    const mark = (index) => (checkMoveValid(index)) ? board[index] = 'x' : false;
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

