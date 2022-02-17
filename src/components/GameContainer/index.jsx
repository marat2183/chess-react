import React, {useState} from 'react';

import s from'./index.module.scss'
import Board from 'components/Board';

import gameManager from 'services/gameManagerService';


const GameContainer = () => {

  const [gameError, setGameError] = useState(
    {
      status: false,
      message: ''
    });

  const [order, setOrder] = useState('white');

  const setOrderHandler = () => {
    const orderColor = gameManager.order;
    setOrder(orderColor)
  }
  
  return (
    <div className="game">
      <h1 className={`${s['game__text']} ${s['game__text--title']}`}>chess</h1>
      <div className={s['game__order']}>
        <span className={s['game__text']}>order:</span>
        <div className={`${s['game__icon']} ${order === "white" ? s['game__icon--light'] : s['game__icon--dark']}`}></div>
      </div>
      {
        gameError.status && 
        <div className={s["error"]}>
          <span className={s["error__text"]}>{gameError.message}</span>
        </div>
      }
      <Board setGameError={setGameError} setOrderHandler={setOrderHandler}/>
    </div>
  )
}

export default GameContainer
