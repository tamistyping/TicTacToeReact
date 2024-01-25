import { useState } from 'react'
import './Board.css';


export default function Board() {

    const SYMBOLS = {
        '1': 'X',
        '-1': 'O',
        'null': ''
      }

    const PLAYER_NAMES = {
        '1': 'Player 1',
        '-1': 'Player 2',
        'null': ''
        }
      
    const [board, setBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [turn, setTurn] = useState(1)
    const [winner, setWinner] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [playerXScore, setPlayerXScore] = useState(0);
    const [playerOScore, setPlayerOScore] = useState(0);


    function resetGame() {
        setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        setTurn(1);
        setWinner(false);
        setGameOver(false);
    }
    
    
    function checkWinner(board) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(true);
                setGameOver(true);
                updateScores(turn);
                return true;
            }
          }
          if (!board.includes(0)) {
              setGameOver(true)
              setWinner(false)
              return true
          }

            return false
        
    }

    function updateScores(player) {
        if (player === 1) {
          setPlayerXScore(playerXScore + 1);
        } else if (player === -1) {
          setPlayerOScore(playerOScore + 1);
        }
      }


    function handleClick(e) {
        if (gameOver) {
            return
        } else if (board[e.target.value] === 0) {
        const updatedBoard = [...board]
        updatedBoard[e.target.value] = turn
        setBoard(updatedBoard)
        const newTurn = turn * -1
        const isGameOver = checkWinner(updatedBoard);
        setTurn(newTurn)

      } else {
        alert("can't play here" )
      }
      
    }

    return (
    <div className='fullGrid'>

        {!winner && !gameOver && (
            <h2>{PLAYER_NAMES[turn]}'s Turn</h2>
        )}
        {winner && (
            <h2>{PLAYER_NAMES[turn * -1]} has won!</h2>
        )}
        {!winner && gameOver && (
            <h2>It's a tie!</h2>
        )}
        <div className='board-wrapper'>
        <div className="board-row">
            <button className="square" value="0" onClick={handleClick}>{SYMBOLS[board[0]]}</button>
            <button className="square" value="1" onClick={handleClick}>{SYMBOLS[board[1]]}</button>
            <button className="square" value="2" onClick={handleClick}>{SYMBOLS[board[2]]}</button>
        </div>
        <div className="board-row">
            <button className="square" value="3" onClick={handleClick}>{SYMBOLS[board[3]]}</button>
            <button className="square" value="4" onClick={handleClick}>{SYMBOLS[board[4]]}</button>
            <button className="square" value="5" onClick={handleClick}>{SYMBOLS[board[5]]}</button>
        </div>
        <div className="board-row">
            <button className="square" value="6" onClick={handleClick}>{SYMBOLS[board[6]]}</button>
            <button className="square" value="7" onClick={handleClick}>{SYMBOLS[board[7]]}</button>
            <button className="square" value="8" onClick={handleClick}>{SYMBOLS[board[8]]}</button>
        </div>
        </div>
        <div className='scoreboard'>
            <p>{PLAYER_NAMES[1]}: {playerXScore}</p> &nbsp; &nbsp; &nbsp;
            <p>{PLAYER_NAMES[-1]}: {playerOScore}</p>
        </div>
        {(winner || gameOver) && (
        <div>
            <button onClick={resetGame} className="playAgain">PLAY AGAIN</button>
        </div>
        )}
        
    </div> 
    )

}



//! ------- PLAN ----------
// DONE Handle click function (make sure buttons are giving us a value on click)
// DONE Handle turn to change message and alter players state (X/0)
// DONE Handle winner function (apply win state)
// DONE Apply init function (make the game start/restart on button click)
// DONE Dynamically generate messages (win/tie messages)
// DONE STYLING
