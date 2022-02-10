import React from 'react';

import s from'./index.module.scss'
import { figuresImgs } from 'figures.js'


const Field = ({fieldNumber, field}) => {
  
  const definingСlassName = (fieldNumber) => {
    const colNum = fieldNumber % 8;
    const rowNum = Math.floor(fieldNumber / 8);
    if (rowNum % 2 === colNum % 2){
      return [s['field'], s['field--light']];
    }
    return [s['field'], s['field--dark']];
  }

  const onClickHandler = (field) => {
   console.log('click')
  }

  const classNames = definingСlassName(fieldNumber);

  return (
    <div onClick={() => onClickHandler(field)} className={`${classNames[0]} ${classNames[1]} ${field.isActive ? s['field--active'] : ''}`}>
      {
        field.figure && 
        <img src={figuresImgs[field.figure.color][field.figure.type]} alt="" className={s["field__figure"]} />
      }
    </div>
  )
}

export default Field
