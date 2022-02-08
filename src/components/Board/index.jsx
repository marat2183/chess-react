import React from 'react';
import { useSelector } from 'react-redux';

import Field from 'components/Field';
import s from './index.module.scss'


const Board = () => {
  const fieldsObject = useSelector((state) => state.game.fields)
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
