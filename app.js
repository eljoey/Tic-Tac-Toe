const gameBoard = (() => {
    const board = ['', '', '','', '', '','', '', ''];
//change 'x' in markBoard to player.mark after player factory set up
    const mark = (index, mark) => (checkMoveValid(index)) ? board[index] = 'x' : false;
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

const displayController = (() => {
    const addEvList = () => {
        let gamePad = document.querySelectorAll('.box')
            gamePad.forEach( function(element) {
                element.addEventListener('click', () => gameBoard.mark(player.mark));
        });
    };

    return {
        addEvList,
    };
})();


//reminders