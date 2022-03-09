import ValidationService from "./validationService"

const PawnMoveValidationService = class extends ValidationService {

  сanTakeOnThePass = (fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor, opponentMoveHistory) => {

    const isFromRowCorrect = figureColor === 'white' ? fromRow === 5 : fromRow === 4;
    if (!isFromRowCorrect){
      return false;
    }

    const isRowDeltaCorrect = this.delta(toRow,fromRow) === colorFactor;
    if (!isRowDeltaCorrect){
      return false;
    }

    const isColDeltaCorrect = this.delta(toCol, fromCol) <= 1 && this.delta(toCol, fromCol) >= -1;
    if (!isColDeltaCorrect){
      return false;
    }

    if (!this.isIndexesValid(toRow - colorFactor, toCol)){
      return false
    }
    
    const isFieldBusyByOpponentFigure = this.isFieldBusyByOpponentFigure(toRow - colorFactor, toCol, fields, figureColor);
    if (!isFieldBusyByOpponentFigure){
      return false
    }
    
    const fieldIndex = this.formatter.getFieldIndex(toRow - colorFactor, toCol);
    const opponentFigureId = fields[fieldIndex].figure?.id
    
    const isItFirstOpponentMoveForFigure = opponentMoveHistory.filter(figureId => figureId === opponentFigureId).length === 1;
    if (!isItFirstOpponentMoveForFigure){
      return false
    }
    
    const isItLastOpponentMove = opponentMoveHistory[opponentMoveHistory.length - 1] === opponentFigureId;
    if (!isItLastOpponentMove){
      return false
    }

    return true
  }

  canJump = (fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor) => {
    const defaultRow = figureColor === 'white' ? 2 : 7;

    const isRowCorrect = fromRow === defaultRow
    if (!isRowCorrect){
      return false
    }

    const isRowDeltaCorrect = this.delta(toRow, fromRow) === 2 * colorFactor;
    if (!isRowDeltaCorrect){
      return false
    }

    const isColDeltaCorrect = this.delta(toCol, fromCol) === 0;
    if (!isColDeltaCorrect){
      return false
    }

    const isFirstFieldFree = this.isFieldFree(toRow, toCol, fields);
    if (!isFirstFieldFree){
      return false
    }

    const isSecondFieldFree = this.isFieldFree(fromRow + colorFactor, toCol, fields);
    if (!isSecondFieldFree){
      return false
    }

    return true
  }

  canBeat = (fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor) => {
    
    const isRowDeltaCorrect = this.delta(toRow, fromRow) === colorFactor;
    if (!isRowDeltaCorrect){
      return false
    }

    const isColDeltaCorrect = this.delta(toCol, fromCol) === 1 || this.delta(toCol, fromCol) === -1;
    if (!isColDeltaCorrect){
      return false
    }

    const isFieldBusyByOpponentFigure = this.isFieldBusyByOpponentFigure(toRow, toCol, fields, figureColor)
    if (!isFieldBusyByOpponentFigure){
      return false
    }

    return true
  }

  canStep = (fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor) => {

    const isRowDeltaCorrect = this.delta(toRow, fromRow) === colorFactor;
    if (!isRowDeltaCorrect){
      return false
    }

    const isColDeltaCorrect = this.delta(toCol, fromCol) === 0;
    if (!isColDeltaCorrect){
      return false
    }

    const isFieldBusyByOpponentFigure = this.isFieldBusyByOpponentFigure(toRow, toCol, fields, figureColor);
    if (isFieldBusyByOpponentFigure){
      return false
    }

    return true
  }

  isMoveValid = (fieldFrom, fieldTo, fields, figureColor, opponentMoveHistory) => {
    const [fromRow, fromCol] = this.formatter.fieldNameToIndexes(fieldFrom);
    const [toRow, toCol] = this.formatter.fieldNameToIndexes(fieldTo);

    const colorFactor = figureColor === 'white' ? 1 : -1;

    if (
        this.canBeat(fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor) || 
        this.canJump(fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor) || 
        this.canStep(fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor) ||
        this.сanTakeOnThePass(fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor, opponentMoveHistory)
       )
    {
      return true
    }
    return false
  }
}

export default PawnMoveValidationService