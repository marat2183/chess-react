import { whiteFigures, blackFigures } from "fieldsData.js";

import PlayerService from "./playerService";

import ValidationService from "./validationServices/validationService";
import FormatterService from "./formatterService";
import MoveValidationService from "./validationServices/moveValidationService";
import KnightValidationService from "./validationServices/knightValidationService";
import QueenValidationService from "./validationServices/queenValidationService";
import BishopValidationService from "./validationServices/bishopValidationService";
import RookValidationService from "./validationServices/rookValidationService";
import PawnValidationService from "./validationServices/pawnValidationService";
import KingValidationService from "./validationServices/kingValidationService";

import OrderManagerService from "./orderManagerService";
import BoardManagerService from "./boardManagerService";
import MovingFiguresManagerService from "./movingFiguresManagerService";


const GameManagerService = class {
  constructor(
    movingFiguresManager,
    orderManager,
    boardManager
  )
  {
    this.movingFiguresManager = movingFiguresManager;
    this.orderManager = orderManager;
    this.boardManager = boardManager;
    this.availableFieldsToMove = [];
    this.playerSelectedField = null;
  }

  toggleOrder = () => this.orderManager.toggleOrder()
  
  getPlayerSelectedField = () => {
    const player = this.orderManager.getPlayerByOrder();
    const field = player.getSelectedField();
    return field;
  }

  setPlayerSelectedField = (field) => {
    const orderColor = this.orderManager.getOrderColor()
    const player = this.orderManager.getPlayerByOrder();
    if (field.figure && field.figure.color === orderColor){
      player.setSelectedField(field);
      this.playerSelectedField = field;
    }
  }

  resetPlayerSelectedField = () => {
    const player = this.orderManager.getPlayerByOrder();
    player.resetSelectedField();
    this.playerSelectedField = null;
  }

  getAvailableFieldsToMove = () => this.availableFieldsToMove;

  setAvailableFieldsToMove = () => {
    const player = this.orderManager.getPlayerByOrder();
    const fields = this.getBoardFields()
    const availableFieldsToMove = this.movingFiguresManager.getAllValidPlayerMoves(fields, player.selectedField.figure.color);
    if (Object.values(availableFieldsToMove).flat().length === 0) {
      console.log('end game');
      this.resetAvailableFieldsToMove()
      return
    }
    this.availableFieldsToMove = availableFieldsToMove[player.selectedField.figure.id.toString()];
  }

  resetAvailableFieldsToMove = () => {
    this.availableFieldsToMove = []
  }

  changePlayerFigurePosition = (newField) => {
    const player = this.orderManager.getPlayerByOrder();
    player.updateFigureMoveHistory(player.selectedField.figure.id)
    this.boardManager.updateFieldsHandler(player.selectedField, newField);
    return
    
  }

  getBoardFields = () => this.boardManager.getFields()

  getAllFields = () => {
    const boardFields = this.getBoardFields();
    const playerSelectedField = this.playerSelectedField;
    const availableFieldsToMove = this.availableFieldsToMove
    return {boardFields, playerSelectedField, availableFieldsToMove}
  }
}

const START_FIGURE_COLOR = 'white'


const whiteFigurePlayer = new PlayerService(whiteFigures);
const blackFigurePlayer = new PlayerService(blackFigures);

const formatter = new FormatterService();
const validation = new ValidationService(formatter);


const moveValidation = new MoveValidationService(formatter)
const knightValidation = new KnightValidationService(formatter);
const queenValidation = new QueenValidationService(formatter);
const bishopValidation = new BishopValidationService(formatter);
const rookValidation = new RookValidationService(formatter);
const pawnValidation = new PawnValidationService(formatter);
const kingValidation = new KingValidationService(formatter);


const orderManager = new OrderManagerService(
  whiteFigurePlayer,
  blackFigurePlayer, 
  START_FIGURE_COLOR
)

const boardManager = new BoardManagerService(formatter, moveValidation);

const movingFiguresManager = new MovingFiguresManagerService(
  orderManager,
  validation,
  formatter,
  knightValidation,
  queenValidation,
  bishopValidation,
  rookValidation,
  pawnValidation,
  kingValidation
)

const gameManager = new GameManagerService(
  movingFiguresManager,
  orderManager,
  boardManager
);

export default gameManager;