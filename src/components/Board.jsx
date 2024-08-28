import React from 'react';
import Square from './Square';

export default function Board({ squares, xIsNext, onPlay }) {

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares) || isBoardFull(squares)) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? "X" : "O";
        onPlay(newSquares);
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {winner: squares[a], winnerLine: lines[i]};
            }
        }
        return null;
    }
    function isBoardFull(squares){
        let variable;
        if(calculateWinner(squares)){
            variable = false;
        }
        else{
            variable = true;
        }
        return squares.every(square => square !== null) && variable;
    }

    const winner = calculateWinner(squares) ? calculateWinner(squares).winner: null;
    const winnerLine = calculateWinner(squares) ? calculateWinner(squares).winnerLine: "";
    let status;
    let winningLine;
    
    if(isBoardFull(squares)){
        status = "IT IS A DRAWW LADS";
    }
    else if( winner){
        status = `The winner is ${winner}`;
        winningLine = `The winning Line is ${winnerLine}`;
    }
    else{
        status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
    }
        


   // Function to render a square
    function renderSquare(i) {
        return (
            <Square
                value={squares[i]}
                handleClick={() => handleClick(i)}
            />
        );
    }


    // Generate the board using two loops
    function renderBoard() {
        const board = [];
        for (let row = 0; row < 3; row++) {
            const boardRow = [];
            for (let col = 0; col < 3; col++) {
                const squareIndex = row * 3 + col;
                boardRow.push(renderSquare(squareIndex));
            }
            board.push(
                <div className="board-row">
                    {boardRow}
                </div>
            );
        }
        return board;
    }

    return (
        <div className='container'>
            <div className='status'>{status}</div>
            <div className='status'>{winningLine}</div>
            {renderBoard()}
        </div>
    );
}
