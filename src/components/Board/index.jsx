import React, { useState } from 'react';

import Field from 'components/Field';
import s from './index.module.scss'

import gameManager from 'services/gameManagerService.js'


const Board = () => {
  const fieldsObject = gameManager.getAllFields();
  const fieldsList = Object.values(fieldsObject)

  const [fields, setFields] = useState(fieldsList)
  
  const updateFieldsState = () => {
    const fieldsObject = gameManager.getAllFields();
    const fieldsList = Object.values(fieldsObject)
    setFields(fieldsList)
  }

  const onFieldClickHandler = (field) => {
    const selectedField = gameManager.getPlayerSelectedField();
    if (!selectedField){
      console.log('select field');
      gameManager.setPlayerSelectedField(field);
      updateFieldsState();
    }
    else{
      console.log('change position');
      gameManager.changePlayerFigurePosition(field);
      gameManager.toggleOrder();
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
