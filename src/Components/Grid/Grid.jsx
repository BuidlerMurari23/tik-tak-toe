import { useState } from "react";
import Card from "../Card/Card";
import whoIsWinner from "../../Helpers/CheckingWinner";
import "./Grid.css"


function Grid({numberOfCards}){
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true);
    const [winner, setWinner] = useState(null);

    function play(index){
        if ( turn == true ){
            board[index] = "O"
        }else{
            board[index] = "X"
        }

        const win = whoIsWinner(board, (turn) ? "O" : "X");
        if(win){
            setWinner(win);

           
        }

        setBoard([...board]);
        setTurn(!turn);
    }
    function reset(){
        setBoard(Array(numberOfCards).fill(""));
        setTurn(true);
        setWinner(null);

    }

    return (
        <div className="grid-wrapper">
            <div>
                { 
                    winner && <>
                    <h1 className="turn-hightlighter">Winner is : {winner} </h1>
                    <button className="reset" onClick={reset} >Reset Game</button>
                    </>
                }
            </div>
            <h1 className="turn-hightlighter"> CurrenT Turn : {(turn) ? "O" : "X"} </h1>
            <div className="grid">{
            board.map( (element, index) => <Card gameEnd={(winner) ? true : false} key={index} player={element} onPlay={() => play(index)} index={index} />)
            } </div>
        </div>
    )
}

export default Grid;