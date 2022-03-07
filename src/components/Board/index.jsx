import React, { useState } from 'react';

import Field from 'components/Field';
import s from './index.module.scss'

import gameManager from 'services/gameManagerService.js'


const Board = ({setGameError, setOrderHandler}) => {

  const fieldsInit = gameManager.getAllFields();

  const [fields, setFields] = useState(fieldsInit['boardFields']);
  const [playerSelectedField, setPlayerSelectedField] = useState(null);
  const [availableFieldsToMove, setAvailableFieldsToMove] = useState([])
  
  const updateFieldsState = () => {
    const {boardFields, playerSelectedField, availableFieldsToMove} = gameManager.getAllFields()
    setFields(boardFields);
    setPlayerSelectedField(playerSelectedField)
    setAvailableFieldsToMove(availableFieldsToMove.map(field => field.fieldName))
  }

  const onFieldClickHandler = (field) => {
    setGameError({
      status: true,
      message: ''
    })

    const selectedField = gameManager.getPlayerSelectedField();
  
    if (!selectedField){
      gameManager.setPlayerSelectedField(field);
      gameManager.setAvailableFieldsToMove();
      updateFieldsState()
      return

    }
    if (selectedField.fieldName === field.fieldName){
      gameManager.resetPlayerSelectedField();
      gameManager.resetAvailableFieldsToMove();
      updateFieldsState()
      return
    }

    try{
      gameManager.changePlayerFigurePosition(field);
      gameManager.resetAvailableFieldsToMove();
      gameManager.resetPlayerSelectedField();
      updateFieldsState();
      gameManager.toggleOrder();
      return
    }
    catch(e){
      // setGameError({
      //   status: true,
      //   message: e.message
      // })
      // changeFigurePositionExceptionHandler()
      // updateFieldsState();
    }
  }
  
  return (
    <div className={s['board']}>
      {
        fields.map((currentField, index) => {
          return <Field key={currentField.fieldName} 
                        field={currentField}
                        playerSelectedField = {playerSelectedField}
                        availableFieldsToMove = {availableFieldsToMove}
                        fieldNumber={index}
                        onClickHandler={onFieldClickHandler} 
                  />
        })
      }
    </div>
  );
}

export default Board
