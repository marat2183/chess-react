import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import s from'./index.module.scss'
import { figuresImgs } from 'figures.js'
import { setFieldActive, setFieldInactive, changeFigurePosition, toggleOrder } from 'slices/game.js'
import {setSelectedField, resetSelectedField} from 'slices/players.js'


const Field = ({fieldNumber, field}) => {
  const dispatch = useDispatch();
  
  const playersList = useSelector((state) => state.players.values);
  const playerId = useSelector((state) => state.game.order);
  const playerColor = playersList[playerId].color;

  
  const definingСlassName = (fieldNumber) => {
    const colNum = fieldNumber % 8;
    const rowNum = Math.floor(fieldNumber / 8);
    if (rowNum % 2 === colNum % 2){
      return [s['field'], s['field--light']];
    }
    return [s['field'], s['field--dark']];
  }

  const onClickHandler = (field) => {
    if (!playersList[playerId].selectedField) {
      if (!field.isBusy){
        console.log('field is empty');
        return
      }
      if (field.isBusy && field.figure.color !== playerColor){
        console.log('its not your figure color');
        return
      }
      dispatch(setFieldActive(field));
      dispatch(setSelectedField({
        id: playerId, 
        field: {
          fieldName: field.fieldName,
          figure: field.figure
        }
      }))
      console.log('figure selected');
      return
      
    }
    if (field.fieldName === playersList[playerId].selectedField.fieldName){
      dispatch(setFieldInactive(field));
      dispatch(resetSelectedField({id: playerId}));
      console.log("remove selected figure");
      return
    }
    dispatch(changeFigurePosition({
      oldFieldName: playersList[playerId].selectedField.fieldName,
      figure: playersList[playerId].selectedField.figure,
      newFieldName: field.fieldName
    }));
    dispatch(setFieldInactive({fieldName: playersList[playerId].selectedField.fieldName}));
    dispatch(resetSelectedField({id: playerId}));
    dispatch(toggleOrder());
    console.log('move');
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
