import React, { useState } from 'react';

import Field from 'components/Field';
import s from './index.module.scss'

import gameManager from 'services/gameManagerService.js'



const setSelectedFieldHandler = (field) => {
  gameManager.setPlayerSelectedField(field);
  gameManager.setAvailableFieldsToMove();
}

const resetSelectedFieldHandler = () => {
  gameManager.resetPlayerSelectedField();
  gameManager.resetAvailableFieldsToMove();
}

const changeFigurePositionHandler = (field) => {
  gameManager.changePlayerFigurePosition(field);
  gameManager.toggleOrder();
  gameManager.resetAvailableFieldsToMove();
}

const changeFigurePositionExceptionHandler = () => {
  // gameManager.resetAvailableFieldsToMove();
}

const Board = ({setGameError, setOrderHandler}) => {

  const fieldsObject = gameManager.getAllFields();
  const fieldsList = Object.values(fieldsObject)

  const [fields, setFields] = useState(fieldsList);
  
  const updateFieldsState = () => {
    const fieldsObject = gameManager.getAllFields();
    const fieldsList = Object.values(fieldsObject)
    setFields(fieldsList)
  }

  const onFieldClickHandler = (field) => {
    setGameError({
      status: true,
      message: ''
    })

    const selectedField = gameManager.getPlayerSelectedField();
    
    if (!selectedField){
      try{
        setSelectedFieldHandler(field)
        updateFieldsState();
        return
      }
      catch(e){
        setGameError({
          status: true,
          message: e.message
        })
        return
      }
    }

    if (selectedField.fieldName === field.fieldName){
      resetSelectedFieldHandler()
      updateFieldsState();
      return
    }

    try{
      changeFigurePositionHandler(field);
      setOrderHandler();
      updateFieldsState();
      return
    }
    catch(e){
      setGameError({
        status: true,
        message: e.message
      })
      changeFigurePositionExceptionHandler()
      updateFieldsState();
    }
  }
  
  return (
    <div className={s['board']}>
      {
        fields.map((currentField, index) => {
          return <Field key={currentField.fieldName} 
                        field={currentField} 
                        fieldNumber={index}
                        onClickHandler={onFieldClickHandler} 
                  />
        })
      }
    </div>
  );
}

export default Board
