import React from 'react';

import s from './App.module.scss';
import Board from 'components/Board';

const App = () => {
  return (
    <div className={s["content"]}>
      <div className={s['content__wrapper']}>
        <h1 className={s['content__title']}>
          chess
        </h1>
        <Board />
      </div>
    </div>
  );
}

export default App;
