import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import s from'./index.module.scss'
import { figuresImgs } from 'figures.js';
import { setFieldActive, setFieldDisactive, DeleteFigureFromField, AddFigureToField, toggleOrder } from 'slices/game.js';
import {setSelectedField, resetSelectedField} from 'slices/players.js'

const Field = ({fieldNumber, field}) => {
  const dispatch = useDispatch()
  const playersList = useSelector((state) => state.players.players)
  const order = useSelector((state) => state.game.order)
  const color = playersList[order].color;

  const onClickHandler = (field) => {
    if (!playersList[order].selectedField) {
      if (!field.isBusy){
        console.log('field is empty')
      }
      else if (field.isBusy && field.figure.color === color){
        dispatch(setFieldActive(field));
        dispatch(setSelectedField({
          id: order, 
          field: {
            fieldName: field.fieldName,
            figure: field.figure
          }
        }))
        console.log('figure selected')
      }
      else if (field.isBusy && field.figure.color !== color){
        console.log('its not your figure color')
      }
    }
    else if (playersList[order].selectedField){
      if (field.fieldName === playersList[order].selectedField.fieldName){
        dispatch(setFieldDisactive(field));
        dispatch(resetSelectedField({id: order}))
        console.log("remove selected figure")
      }
      else{
        dispatch(DeleteFigureFromField({fieldName: playersList[order].selectedField.fieldName}))
        dispatch(setFieldDisactive({fieldName: playersList[order].selectedField.fieldName}))
        dispatch(AddFigureToField({
          fieldName: field.fieldName,
          figure: playersList[order].selectedField.figure
        }))
        dispatch(resetSelectedField({id: order}))
        dispatch(toggleOrder())
        console.log('move')
      }
    }
  }

  const definingСlassName = (fieldNumber) => {
    const colNum = fieldNumber % 8;
    const rowNum = Math.floor(fieldNumber / 8)
    if (rowNum % 2 === colNum % 2){
      return [s['field'], s['field--light']];
    }
    return [s['field'], s['field--dark']];
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

export default Field;
