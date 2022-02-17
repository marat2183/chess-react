import React from 'react';

import s from './App.module.scss';
import GameContainer from 'components/GameContainer';


const App = () => {
  return (
    <div className={s["content"]}>
      <div className={s['content__wrapper']}>
        <GameContainer />
      </div>
    </div>
  );
}

export default App;
