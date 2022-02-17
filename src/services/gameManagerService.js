import cloneDeep from "lodash/cloneDeep";

import { blackFiguresFieldsInit, whiteFiguresFieldsInit, fieldsInit } from "fieldsData.js";

import PlayerService from "./playerService";
import PawnPredictionMoveService  from "./predictionServices/pawnPredictionMoveService";
import RookPredictionMoveService from "./predictionServices/rookPredictionMoveService";
import KnightPredictionMoveService from "./predictionServices/knightPredictionMoveService";
import BishopPredictionMoveService from "./predictionServices/bishopPredictionMoveService";
import KingPredictionMoveService from "./predictionServices/kingPredictionService";
import ValidationService from "./validationService";
import FormatterService from "./formatterService";


const GameManagerService = class {
  constructor(
    blackFigurePlayer, 
    whiteFigurePlayer, 
    orderColor, 
    pawnPrediction, 
    rookPrediction, 
    knightPrediction, 
    bishopPrediction,
    kingPrediction
  )
  {
    this.blackFigurePlayer = blackFigurePlayer;
    this.whiteFigurePlayer = whiteFigurePlayer;
    this.order = orderColor;
    this.pawnPrediction = pawnPrediction;
    this.rookPrediction = rookPrediction;
    this.knightPrediction = knightPrediction;
    this.bishopPrediction = bishopPrediction;
    this.kingPrediction = kingPrediction;
    this.availableFieldsToMove = null
  }

  toggleOrder = () => {
    this.order = this.order === 'white' ? 'black' : 'white';
  }

  getPlayerByOrder = () => {
    const currentPlayer = this.order === 'white' ? this.whiteFigurePlayer : this.blackFigurePlayer;
    return currentPlayer;
  }

  getOpponentPlayer = () => {
    const opponentPlayer = this.order === 'white' ? this.blackFigurePlayer : this.whiteFigurePlayer;
    return opponentPlayer
  }

  getPlayerSelectedField = () => {
    const player = this.getPlayerByOrder();
    const field = player.getSelectedFigureField();
    return field;
  }

  setPlayerSelectedField = (field) => {
    const player = this.getPlayerByOrder();
    player.setSelectedFigureField(field);
  }

  resetPlayerSelectedField = () => {
    const player = this.getPlayerByOrder();
    player.resetSelectedFigureField();
  }

  changePlayerFigurePosition = (newField) => {
    const player = this.getPlayerByOrder();
    //validation move
    const availableFieldsToMove = this.getAvailableFieldsToMove();
    
    if (availableFieldsToMove.includes(newField.fieldName)){
      if (newField.figure?.color !== this.order){
        const opponentPlayer = this.getOpponentPlayer();
        opponentPlayer.removeFromFiguresFields(newField.fieldName)
      }
      player.changeFigurePosition(newField);
      player.resetSelectedFigureField();
      return
    }
    throw new Error("Incorrect Field to Move")
  }

  getAvailableFieldsToMove = () => this.availableFieldsToMove;

  setAvailableFieldsToMove = () => {
    const selectedField = this.getPlayerSelectedField();
    const fields = this.getAllFields();
    switch (selectedField.figure.type){
      case 'pawn':
        this.availableFieldsToMove = this.pawnPrediction.getAvailableFieldsToMove(
            selectedField.figure, 
            selectedField.fieldName, 
            fields
          );
        break
      case 'rook':
        this.availableFieldsToMove = this.rookPrediction.getAvailableFieldsToMove(
          selectedField.figure, 
          selectedField.fieldName, 
          fields
        );
        break;
      case 'knight':
        this.availableFieldsToMove = this.knightPrediction.getAvailableFieldsToMove(
          selectedField.figure, 
          selectedField.fieldName, 
          fields
        );
        break;
      case 'bishop':
        this.availableFieldsToMove = this.bishopPrediction.getAvailableFieldsToMove(
          selectedField.figure, 
          selectedField.fieldName, 
          fields
        );
        break;
      case 'queen':
        const rookFields = this.rookPrediction.getAvailableFieldsToMove(
          selectedField.figure, 
          selectedField.fieldName, 
          fields
        );
        const bishopFields = this.bishopPrediction.getAvailableFieldsToMove(
          selectedField.figure, 
          selectedField.fieldName, 
          fields
        );
        this.availableFieldsToMove = [...rookFields, ...bishopFields]
        break;
      case 'king':
        this.availableFieldsToMove = this.kingPrediction.getAvailableFieldsToMove(
          selectedField.figure, 
          selectedField.fieldName, 
          fields
        );
        break;
      default:
        break;
    }
    
    return
  }

  resetAvailableFieldsToMove = () => {
    this.availableFieldsToMove = null;
  };

  getFiguresFields = () => {
    const whiteFigures = this.whiteFigurePlayer.getFiguresFields();
    const blackFigures = this.blackFigurePlayer.getFiguresFields();
    return {...whiteFigures, ...blackFigures}
  }

  getAllFields = () => {
    const defaultFields = cloneDeep(fieldsInit);
    const figuresFields = this.getFiguresFields();
    const availableFieldsToMove = this.getAvailableFieldsToMove();
    
    const allFields = {...defaultFields, ...figuresFields}

    if (availableFieldsToMove){
      availableFieldsToMove.forEach(field => allFields[field].isAvailableToMove = true);
      return allFields;
    }

    const allFieldsList = Object.values(allFields);
    allFieldsList.forEach(field => {
      if (field.isAvailableToMove){
        field.isAvailableToMove = false;
      }
    });

    return allFields;
  }
}


const whiteFigurePlayer = new PlayerService(whiteFiguresFieldsInit);
const blackFigurePlayer = new PlayerService(blackFiguresFieldsInit);

const formatter = new FormatterService();
const validation = new ValidationService(formatter);

const pawnPrediction = new PawnPredictionMoveService(validation, formatter);
const rookPrediction = new RookPredictionMoveService(validation, formatter);
const knightPrediction = new KnightPredictionMoveService(validation, formatter);
const bishopPrediction = new BishopPredictionMoveService(validation, formatter);
const kingPrediction = new KingPredictionMoveService(validation, formatter)

const gameManager = new GameManagerService(
  blackFigurePlayer, 
  whiteFigurePlayer, 
  'white', 
  pawnPrediction, 
  rookPrediction, 
  knightPrediction,
  bishopPrediction,
  kingPrediction
);

export default gameManager;