import { blackFiguresFieldsInit, whiteFiguresFieldsInit, fieldsInit } from "fieldsData.js";
import PlayerService from "./playerService";

const GameManagerService = class {
  constructor(blackFigurePlayer, whiteFigurePlayer, orderColor){
    this.blackFigurePlayer = blackFigurePlayer;
    this.whiteFigurePlayer = whiteFigurePlayer;
    this.order = orderColor;
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
    player.changeFigurePosition(newField)
    player.resetSelectedFigureField()
  }

  getFiguresFields = () => {
    const whiteFigures = this.whiteFigurePlayer.getFiguresFields();
    const blackFigures = this.blackFigurePlayer.getFiguresFields();
    return {...whiteFigures, ...blackFigures}
  }

  getAllFields = () => {
    const defaultFields = fieldsInit;
    const figuresFields = this.getFiguresFields();
    const updatedFields = {...defaultFields, ...figuresFields}
    return updatedFields;
  }
}


const whiteFigurePlayer = new PlayerService(whiteFiguresFieldsInit)
const blackFigurePlayer = new PlayerService(blackFiguresFieldsInit)

const gameManager = new GameManagerService(blackFigurePlayer, whiteFigurePlayer, 'white')

export default gameManager;