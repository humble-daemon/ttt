import "./App.css";
import { useState } from "react";
function App() {
  return <Game></Game>;
}

export default App;

function Game(){
  const[moves, setMoves] = useState([Array(9).fill("")]);
  const[currentMove, setCurrentMove] = useState(0);
  const squares = moves[currentMove];
  let currentPlayer = currentMove % 2 === 0? 'X' : 'O';

  function handlePlayerClick(i){
      if(gameWon(squares))return;
      if(squares[i] !== "")return;
      const newMoves = moves.slice(0, currentMove + 1);
      newMoves.push(squares.map((square, si) => si !== i? square : currentPlayer))
      setMoves(newMoves);
      setCurrentMove(currentMove + 1);
  }

  function handleHistoryClick(i){
    setCurrentMove(i);
  }

  return(
    <>
      <Board squares={squares} handlePlayerClick={handlePlayerClick}></Board>
      <History moves={moves} handleClick={handleHistoryClick}></History>
    </>

  )
  

}


function History({moves, handleClick}){
  return (
    <div>
      {moves.map((_, i) => <div key={i}><button onClick={()=> handleClick(i)}>move {i}</button></div>)}
    </div>
  );
}

function Board({squares, handlePlayerClick}) {
  return (
    <div className="board">
      <div className="row">
        <Square value={squares[0]} handleClick={()=>handlePlayerClick(0)}></Square>
        <Square value={squares[1]} handleClick={()=>handlePlayerClick(1)}></Square>
        <Square value={squares[2]} handleClick={()=>handlePlayerClick(2)}></Square>
      </div>
      <div className="row">
        <Square value={squares[3]} handleClick={()=>handlePlayerClick(3)}></Square>
        <Square value={squares[4]} handleClick={()=>handlePlayerClick(4)}></Square>
        <Square value={squares[5]} handleClick={()=>handlePlayerClick(5)}></Square>
      </div>
      <div className="row">
        <Square value={squares[6]} handleClick={()=>handlePlayerClick(6)}></Square>
        <Square value={squares[7]} handleClick={()=>handlePlayerClick(7)}></Square>
        <Square value={squares[8]} handleClick={()=>handlePlayerClick(8)}></Square>
      </div>
    </div>
  );
}
function Square({ value , handleClick}) {
  return <div className="square" onClick={handleClick}>{value}</div>;
}


function gameWon(arr){
  let wins = [
    [0, 1, 2],[3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];

  for(let win of wins){
    if(arr[win[0]] !== "" && arr[win[0]] === arr[win[1]] && arr[win[1]] === arr[win[2]]){
        return true;
    }
  }
  return false;

}