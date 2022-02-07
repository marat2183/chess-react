import React from 'react';
import Field from 'components/Field';
import { useSelector } from 'react-redux';

import s from './index.module.scss'

const Board = () => {

  const fieldsObject = useSelector((state) => state.game.fields)
  const fieldsList = Object.values(fieldsObject)

  return (
    <div className={s['board']}>
      {
        fieldsList.map((currentField, index) => {
          return  <Field key={index} field={currentField} fieldNumber={index} />
        })
      }
    </div>
  );
}

export default Board
