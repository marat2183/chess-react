import React from 'react';
import Field from 'components/Field';
import { fieldList } from 'constants';

import s from './index.module.scss'

const Board = () => {

  return (
    <div className={s['board']}>
      {
        fieldList.map((currentField, index) => {
          return  <Field key={index} field={currentField} index={index} />
        })
      }
    </div>
  );
}

export default Board
