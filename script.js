const gameSquares = document.querySelectorAll('.game-square');
const player1Button = document.getElementById('player1-button')
const player2Button = document.getElementById('player2-button')
const player1Form = document.getElementById('player1-form')
const player2Form = document.getElementById('player2-form')
const gameResetButton = document.getElementById('board-reset-button');
const winnerBannerResetButton = document.getElementById('winner-reset-button')
const winnerBanner = document.getElementById('winner-popup');
const winnerMessage = document.getElementById('winner-message')
const formForPlayer1 = document.forms['player1-form']

const clickEvents = (function(){

    
    player1Button.addEventListener('click', (clickEvent) => {
        player1Form.style.display = 'flex';
    })

    player2Button.addEventListener('click', (clickEvent) => {
        player2Form.style.display = 'flex';
    })

    winnerBannerResetButton.addEventListener('click', () => {
        winnerBanner.style.display = 'none';
        gameInfo.gameSetup();

    })

    player1Form.addEventListener('submit', (e) => {
        e.preventDefault();
        let name = ''
        let player1NameValue = player1Form['player1Name'].value
        if (player1NameValue == '') {
            name = 'Player1'
        }
        else {
            name = player1NameValue;
        }
         player1Button.innerText = name;

         player1Form.style.display = 'none';

    })

    
    player2Form.addEventListener('submit', (e) => {
        e.preventDefault();
        let name = ''
        let player2NameValue = player2Form['player2Name'].value
        if (player2NameValue == '') {
            name = 'Player2'
        }
        else {
            name = player2NameValue;
        }
         player2Button.innerText = name;

         player2Form.style.display = 'none';
         
    })


    function setSquareClickEvents(){
        gameSquares.forEach(function(square){
            square.addEventListener('click', function(clickEvent){
                const targetColumn = clickEvent.target.dataset.column;
                const targetRow = clickEvent.target.dataset.row;
                if (gameInfo.currentGameBoard()[targetRow][targetColumn] == ''){
                    //clickEvent.target.innerText = gameInfo.currentTurn();
                    gameInfo.updateGameBoard(targetRow, targetColumn, gameInfo.currentTurn())
                    populateBoard.draw();
                    checkWinCondition.checkWin();
                    gameInfo.updatePlayerTurn()
                    
                }
            })
        }   
    )}
    
    

    gameResetButton.addEventListener('click', () => {
        gameInfo.gameSetup();
    })

    return {setSquareClickEvents}
}());




const gameInfo = (function(){

    //gameBoard info storage
    const gameBoard = {
        board : [
            ['' ,'' ,'' ],
            ['' ,'' ,'' ],
            ['', '', '' ]
        ]
    }

    function updateGameBoard(row, column, value) {
        gameBoard.board[row][column] = value;
    }

    function currentGameBoard(){
        return gameBoard.board;
    }
    //player info storage
    const playerInfo = {currentTurn: 'x'}

    function currentTurn() {
        return playerInfo.currentTurn;
    }

    const Player = function(name, icon) {
        this.name = name; 
        this.icon = icon;
    } 

    function updatePlayerTurn(){
        if (playerInfo.currentTurn === 'x'){
            playerInfo.currentTurn = 'o';
        }
        else {
            playerInfo.currentTurn = 'x';
        }
    }

    function gameSetup() {
        
        gameBoard.board =  [
            ['' ,'' ,'' ],
            ['' ,'' ,'' ],
            ['', '', '' ]
        ];  
        clickEvents.setSquareClickEvents()

        populateBoard.draw()
        
        playerInfo.currentTurn = 'x';
    }

    
    

    return {updatePlayerTurn, 
            currentTurn, 
            currentGameBoard, 
            updateGameBoard, 
            gameSetup}

}());



const populateBoard = (function(){
    function draw(){
        gameSquares.forEach(function(square){
            let row = square.dataset.row;
            let column = square.dataset.column;
            square.innerText = gameInfo.currentGameBoard()[row][column];
        })
    }
    return {draw}
}())


const checkWinCondition = (function(){
    function checkWin(){
        let board = gameInfo.currentGameBoard();
        let turn = gameInfo.currentTurn();
        let flatBoard = gameInfo.currentGameBoard().flat();
       for (let i = 0; i < board.length; i++){
            if (board[i].every((element) => element == gameInfo.currentTurn())){
                displayWinMessage();
            }
            if (board[0][i] == turn && board[1][i] == turn && board[2][i] == turn){
                displayWinMessage();
            }
            if (board[0][0] == turn && board[1][1] == turn && board[2][2] == turn){
                displayWinMessage();
            }
            if (board[2][0] == turn && board[1][1] == turn && board[0][2] == turn){
                displayWinMessage();
            }
            if(gameInfo.currentGameBoard().flat().every(x => x== 'o' || x == 'x')){
                displayTieMessage();
            }
        }
    }
    function displayWinMessage() {
        winnerBanner.style.display = 'block';
        winnerMessage.innerText = `${gameInfo.currentTurn()} is the winner!`;
    }

    function displayTieMessage(){
        winnerBanner.style.display = 'block';
        winnerMessage.innerText = `TIE game!`;
    }
    return {checkWin}
}());

gameInfo.gameSetup();

