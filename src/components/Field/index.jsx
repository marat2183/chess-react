import React from 'react';

import s from'./index.module.scss'
import { figuresImgs } from 'figures.js';

function Field({index, field}) {
  const isGameStarting = true;
  const definingСlassName = (index) => {
    const colNum = index % 8;
    const rowNum = Math.floor(index / 8)
    if (rowNum % 2 === colNum % 2){
      return [s['board__field'], s['board__field--light']];
    }
    return [s['board__field'], s['board__field--dark']];
  }

  const classNames = definingСlassName(index);

  return (
    <div className={`${classNames[0]} ${classNames[1]} ${field.isActive ? s['board__field--active'] : ''}`}>
      {
        isGameStarting && 
        field?.figure && 
        <img src={figuresImgs[field.figure.color][field.figure.type]} alt="" className={s["board__figure"]} />
      }
    </div>
  )
}

export default Field;
