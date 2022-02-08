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
      state.isActive = true;
    },
    stopGame: (state) => {
      state.isActive = false;
    },
    toggleOrder: (state) => {
      state.order = state.order ? 0 : 1;
  },
    setFieldActive: (state, action) => {
        state.fields[action.payload.fieldName] = {...state.fields[action.payload.fieldName], isActive: true}
    },

    setFieldInactive: (state, action) => {
      state.fields[action.payload.fieldName] = {...state.fields[action.payload.fieldName], isActive: false}
    },

    changeFigurePosition: (state, action) => {
      state.fields[action.payload.oldFieldName] = {...state.fields[action.payload.oldFieldName], 
                                                    isBusy: false, 
                                                    figure: null
                                                  }
      state.fields[action.payload.newFieldName] = {...state.fields[action.payload.newFieldName], 
                                                    isBusy: true, 
                                                    figure: action.payload.figure
                                                  }
    }

  },
})

export const {
  startGame, 
  stopGame, 
  setFieldActive, 
  setFieldInactive,
  changeFigurePosition, 
  toggleOrder } = gameSlice.actions

export default gameSlice.reducer