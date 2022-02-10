import React from 'react';

import Field from 'components/Field';
import s from './index.module.scss'

import gameManager from 'services/gameManagerService.js'


const Board = () => {
  const fieldsObject = gameManager.getAllFields();
  const fieldsList = Object.values(fieldsObject)

  return (
    <div className={s['board']}>
      {
        fieldsList.map((currentField, index) => {
          return <Field key={currentField.fieldName} field={currentField} fieldNumber={index} />
        })
      }
    </div>
  );
}

export default Board
