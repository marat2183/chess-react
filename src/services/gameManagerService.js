import { blackFiguresFieldsInit, whiteFiguresFieldsInit, fieldsInit } from "fieldsData.js";
import PlayerService from "./playerService";
import PawnPredictionService  from "./predictionServices/pawnPredictionMoveService";
import ValidationService from "./validationService";
import FormatterService from "./formatterService";


const GameManagerService = class {
  constructor(blackFigurePlayer, whiteFigurePlayer, orderColor, pawnPrediction){
    this.blackFigurePlayer = blackFigurePlayer;
    this.whiteFigurePlayer = whiteFigurePlayer;
    this.order = orderColor;
    this.pawnPrediction = pawnPrediction;
    this.availableFieldsToMove = null
  }

  toggleOrder = () => {
    this.order = this.order === 'white' ? 'black' : 'white';
  }

  getPlayerByOrder = () => {
    const currentPlayer = this.order === 'white' ? this.whiteFigurePlayer : this.blackFigurePlayer;
    return currentPlayer;
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

  changePlayerFigurePosition = (newField) => {
    const player = this.getPlayerByOrder();
    //validation move
    const possibleFieldsToMove = this.getAvailableFieldsToMove();
    console.log(possibleFieldsToMove);
    player.changeFigurePosition(newField);
    player.resetSelectedFigureField();
  }

  getAvailableFieldsToMove = () => this.availableFieldsToMove;

  setAvailableFieldsToMove = () => {
    const selectedField = this.getPlayerSelectedField();
    const fields = this.getAllFields();
    let fieldsToMove = []
    switch (selectedField.figure.type){
      case 'pawn':
        console.log(this.pawnPrediction)
        fieldsToMove = this.pawnPrediction.getAvailableFieldsToMove(selectedField.figure, selectedField.fieldName, fields);
        break;
      default:
    }
    this.availableFieldsToMove = fieldsToMove;
    return
  }

  resetAvailableFieldsToMove = () => {
    this.availableFieldsToMove = null
  };

  getFiguresFields = () => {
    const whiteFigures = this.whiteFigurePlayer.getFiguresFields();
    const blackFigures = this.blackFigurePlayer.getFiguresFields();
    return {...whiteFigures, ...blackFigures}
  }

  getAllFields = () => {
    //JSON.parse/JSON.stringify to deep clone
    const defaultFields = JSON.parse(JSON.stringify(fieldsInit));
    const figuresFields = this.getFiguresFields();
    const availableFieldsToMove = this.getAvailableFieldsToMove();
    const updatedFields = {...defaultFields, ...figuresFields}
    if (availableFieldsToMove){
      availableFieldsToMove.forEach(field => updatedFields[field].isAvailableToMove = true)
    }
    return updatedFields;
  }
}


const whiteFigurePlayer = new PlayerService(whiteFiguresFieldsInit);
const blackFigurePlayer = new PlayerService(blackFiguresFieldsInit);

const formatter = new FormatterService();
const validation = new ValidationService(formatter);

const pawnPrediction = new PawnPredictionService(validation, formatter);

const gameManager = new GameManagerService(blackFigurePlayer, whiteFigurePlayer, 'white', pawnPrediction);

export default gameManager;