//*Handles gameboard */

const gameBoard = (() => {
    const show = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let copy = () => [...show];
    const mark = (index, mark) => (checkMoveValid(index)) ? show[index] = mark : false;
    const checkMoveValid = (index) => ((typeof show[index] === 'number')) ? true : false;
    const reset = () => {
        show.forEach((element, index) => show[index] = index);
    };
    return {
        mark,
        checkMoveValid,
        show,
        reset,
        copy,
    };
})();

//** Player */

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol,}
}

//** Handles display **//

const displayController = (() => {
    const board = document.querySelectorAll('.box');
    const resetBTN = document.querySelector('.resetBTN');
    const startBTN = document.querySelector('.startBTN');
    const gamemodeAI = document.getElementById('stupidAI');
    const gamemodeAI2 = document.getElementById('hardAI');
    const gamemodePvP = document.getElementById('PvP');
    const endMessage = document.getElementById('endMessage')    
     
    const gameListeners = () => {
        resetBTN.addEventListener('click', game.reset)
        startBTN.addEventListener('click', game.start)
        
        board.forEach( function(element) {            
            element.addEventListener('click', () => game.playTurn(element));            
            element.addEventListener('click', () => element.setAttribute('class', 'box tracking-in-expand'));            
        });
    };
    
    const getGameMode = () => {
        if (gamemodeAI.checked) return gamemodeAI.id
        if (gamemodeAI2.checked) return gamemodeAI2.id
        if (gamemodePvP.checked) return gamemodePvP.id
    }

    const toggleRadios = () => {
        if(game.gameOn) {
            gamemodeAI.disabled = true
            gamemodeAI2.disabled = true
            gamemodePvP.disabled = true
        } else {
            gamemodeAI.disabled = false
            gamemodeAI2.disabled = false
            gamemodePvP.disabled = false
        }
    }

    const reset = () => {
        endMessage.innerHTML = 'Tic Tac Toe Game';
        endMessage.setAttribute('class', '')
        board.forEach( function(element) {
            element.innerHTML = '';
            element.setAttribute('class', 'box');
        });
    }

    const winnerAnimations = (name) => {
        endMessage.setAttribute('class', 'text-focus-in');

        if (name == 'tie') {
            endMessage.innerHTML = "You Tied! Try Again!";            
        } else if (game.gameMode == 'PvP') {
            endMessage.innerHTML = "'" + name + "' Won! Congratulations!";            
        } else if (name == 'O') {
            endMessage.innerHTML = "You Won! Congratulations!"
        } else  {
            endMessage.innerHTML = "Oh No! The A.I. Beat You! Try Again!";            
        }
    }

    return {
        gameListeners,
        getGameMode,
        reset,
        winnerAnimations,
        toggleRadios,
    };
})();

//** Handles Game *//

const game = (() => {
    let gameOn = false;
    let turns = 0;    
    const playerOne = Player('O', 'O');
    const playerTwo = Player('X', 'X');
    let currentPlayer = playerOne;
    let gameMode = '';

    const swapCurrentPlayer = () => 
        (game.currentPlayer === playerOne) ? game.currentPlayer = playerTwo: game.currentPlayer = playerOne;
    
    const start = () => {
        reset();
        game.gameOn = true;
        setGameMode();
        setPlayers();
        displayController.toggleRadios();
    }

    const setGameMode = () => {
        game.gameMode = displayController.getGameMode();
    }

    const setPlayers = () => {
        if (game.gameMode == 'PvP') {
            game.playerTwo = Player('X', 'X')
        } else {
            game.playerTwo = Player('AI', 'X')
        }
    }

    const reset = () => {
        gameBoard.reset();
        displayController.reset();
        turns = 0;
        game.gameOn = false;
        displayController.toggleRadios();
        game.currentPlayer = playerOne;
    }

    const playTurn = (element) => {
        if(!game.gameOn) return;

        //Checks for valid move then marks square and swaps players
        if(gameBoard.checkMoveValid(element.id)) {
            element.innerHTML = game.currentPlayer.getSymbol();
            gameBoard.mark((element.id), game.currentPlayer.getSymbol())            
            turns ++;
            swapCurrentPlayer();
        //Checks if theres a winner   
            if (checkForWinner(gameBoard.show) || turns == 9) {
                swapCurrentPlayer();
                congratulateWinner();
        //Checks if its AI's turn then goes if it is
            } else if ( (game.gameMode == 'hardAI' ||game.gameMode == 'stupidAI') && game.currentPlayer == playerTwo) {
                computer.move(game.gameMode);
            }
        }        
    }

    const checkForWinner = (gameBoard) => {
        let board = gameBoard;
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

    const congratulateWinner = () => {
        game.gameOn = false;
        if (checkForWinner(gameBoard.show)) {
            displayController.winnerAnimations(game.currentPlayer.getName())            
        } else {
            displayController.winnerAnimations('tie')
        }
    }

    return {
        checkForWinner,
        currentPlayer,
        reset,
        gameMode,
        playTurn,
        start,
    };
})();

//** Handles Computer picks **//
const computer = (() => {
    const stupidAI = () =>  {
        for(let i = 0; i < 100; i++) {
            let randomIndex = Math.floor(Math.random()*9);
            let randomSpot = document.getElementById(randomIndex);   

            if(gameBoard.checkMoveValid(randomIndex)) {
                game.playTurn(randomSpot);
                randomSpot.click();
                break;
            }
        }
    }

    const minimax = (newBoard, player) => {
        let emptySpotIndex = [];
        emptySpotIndex = newBoard.filter(s => typeof s === 'number');
        
        
    //Check if HumanPlayer Wins    
        if ( (game.checkForWinner(newBoard)) && player === 'O' ) {
            return {score: -10};
    //Check if AI Wins 
        } else if ( (game.checkForWinner(newBoard)) && player === 'X' ){
            return {score: 10}
        } else if (emptySpotIndex.length === 0) {
            return {score: 0}
        }
    
        let moves = [];
        for (let i = 0; i < emptySpotIndex.length; i++) {
            let move = {};
            move.index = newBoard[emptySpotIndex[i]];                                            
            newBoard[emptySpotIndex[i]] = player;

            if (player === 'X'){
                let result = minimax(newBoard, 'O');
                move.score = result.score;
            } else {
                let result = minimax(newBoard, 'X')
                move.score = result.score;
            }

            newBoard[emptySpotIndex[i]] = move.index;
            moves.push(move);
        }

        let bestMove;
        if (player === 'X') {
            let bestScore = 10000;

            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else  {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        
        return moves[bestMove];
    } 

    const move = (mode) => {
        if(mode === 'stupidAI') stupidAI();
        if(mode === 'hardAI') {  
            let bestMove = minimax(gameBoard.copy(), 'X').index;
            let randomSpot = document.getElementById(bestMove); 
            game.playTurn(randomSpot);
            randomSpot.click();
        }         
    }
    return {
        move,
    }
})();

displayController.gameListeners();