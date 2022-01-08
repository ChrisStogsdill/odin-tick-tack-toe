const gameSquares = document.querySelectorAll('.game-square');
const player1Button = document.getElementById('player1-button')
const player1Form = document.getElementById('player1-form')
const gameResetButton = document.getElementById('board-reset-button');

const clickEvents = (function(){

    
    player1Button.addEventListener('click', (clickEvent) => {
        player1Form.style.display = 'flex';
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
        
    }
}());

gameInfo.gameSetup();