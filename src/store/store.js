import { configureStore } from '@reduxjs/toolkit';
import gameReducer from 'slices/game.js';
import playersReducer from 'slices/players.js';


export const store = configureStore({
    reducer: {
      game: gameReducer,
      players: playersReducer,
    },
  })