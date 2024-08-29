import React, { useState } from 'react'
import Board from './Board'

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isAscending, setIsAscending] = useState(true); // State to track sorting order
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0; 

    function handlePlay(nextSquares){
        const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(newHistory);
        setCurrentMove(newHistory.length -1);
    }
    function jumpTo(move){
        setCurrentMove(move);
    }

    function toggleSortOrder() {
        setIsAscending(!isAscending);
    }

    const moves = history.map((squares, index) => {
        let description;
        if(index > 0){
            description = `Go to move # ${index}`
        }
        else{
            description = 'Go to the start of the game';
        }
        return (
            <li key={index}>
                <button className='description-button' onClick={() => jumpTo(index)}>{description}</button>
            </li>
        );
    });

    // Sort the moves based on the current sorting order
    const sortedMoves = isAscending ? moves : moves.reverse();

  return (
    <div className='game'>
        <button onClick={toggleSortOrder} className='description-button'>
            {isAscending ? 'Sort Descending' : 'Sort Ascending'}
        </button>
        <div className='board'>
            <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay}/>
        </div>
        <div className='moves'>
            <ol>{sortedMoves}</ol>
        </div>
        
      
    </div>
  )
}
