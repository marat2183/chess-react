import React, {useState} from 'react';

import s from'./index.module.scss'
import Board from 'components/Board';


const GameContainer = () => {

  const [gameError, setGameError] = useState(
    {
      status: false,
      message: ''
    });
  
  return (
    <>
    <h1 className={`${s['game']} ${s['game__title']}`}>
          chess
    </h1>
    {
      gameError.status && 
      <div className={s["error"]}>
        <span className={s["error__text"]}>{gameError.message}</span>
      </div>
    }
    <Board setGameError={setGameError}/>
   </>
  )
}

export default GameContainer
