import { createSlice } from '@reduxjs/toolkit'
import fieldList from 'fieldsData.js';


const fieldsInit = fieldList


const initialState  = {
    isActive: false,
    order: 0,
    fields: fieldsInit
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isActive = true
    },
    stopGame: (state) => {
      state.isActive = false
    },
    toggleOrder: (state) => {
      state.order = state.order ? 0 : 1;
  },
    setFieldActive: (state, action) => {
        state.fields[action.payload.fieldName] = {...state.fields[action.payload.fieldName], isActive: true}
    },

    setFieldDisactive: (state, action) => {
      state.fields[action.payload.fieldName] = {...state.fields[action.payload.fieldName], isActive: false}
    },

    DeleteFigureFromField: (state, action) => {
      state.fields[action.payload.fieldName].figure = null
    },

    AddFigureToField: (state, action) => {
      state.fields[action.payload.fieldName].figure = action.payload.figure
    },

  },
})

export const {
  startGame, 
  stopGame, 
  setFieldActive, 
  setFieldDisactive,
  DeleteFigureFromField, 
  AddFigureToField,
  toggleOrder } = gameSlice.actions

export default gameSlice.reducer