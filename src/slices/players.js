import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    players: [
      {
        id: 0,
        color: 'white',
        selectedField: null,
        figures: [],
        beatenFigures: []
      },
      {
        id: 1,
        color: 'black',
        selectedField: null,
        figures: [],
        beatenFigures: []
      }

    ]
}

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setSelectedField: (state, action) => {
      state.players[action.payload.id].selectedField = action.payload.field
    },
    resetSelectedField: (state, action) => {
      state.players[action.payload.id].selectedField = null;
    },
    addToBeatenFigures: (state, action) => {
      state.players[action.payload.id].beatenFigures = 
      [...state.players[action.payload.id].beatenFigures, action.payload.figure]
    },
    removeFromFigures: (state, action) => {
      state.players[action.payload.id].figures = 
      state.players[action.payload.id].figures.filter((figure) => figure !== action.payload.figure)
    },
  },
})

export const { addToBeatenFigures, removeFromFigures, setSelectedField, resetSelectedField } = playersSlice.actions

export default playersSlice.reducer