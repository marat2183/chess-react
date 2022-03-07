import ValidationService from "./validationService"

const PawnValidationService = class extends ValidationService {

  canJump = (fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor) => {
    const defaultRow = figureColor === 'white' ? 2 : 7;

    const isRowCorrect = fromRow === defaultRow
    const isRowDeltaCorrect = this.delta(toRow, fromRow) === 2 * colorFactor;
    const isColDeltaCorrect = this.delta(toCol, fromCol) === 0;
    const isFirstFieldFree = this.isFieldFree(toCol, toRow, fields);
    const isSecondFieldFree = this.isFieldFree(toCol, fromRow + colorFactor, fields);


    if (isRowCorrect && isRowDeltaCorrect && isColDeltaCorrect && isFirstFieldFree && isSecondFieldFree){
      return true
    }
    return false
  }

  canBeat = (fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor) => {
    
    const isRowDeltaCorrect = this.delta(toRow, fromRow) === colorFactor;
    const isColDeltaCorrect = this.delta(toCol, fromCol) === 1 || this.delta(toCol, fromCol) === -1;
    const isFieldBusyByOpponentFigure = this.isFieldBusyByOpponentFigure(toCol, toRow, fields, figureColor)
  
    if (isRowDeltaCorrect && isColDeltaCorrect && isFieldBusyByOpponentFigure){
      return true
    }
    return false
  }

  canStep = (fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor) => {

    const isRowDeltaCorrect = this.delta(toRow, fromRow) === colorFactor;
    const isColDeltaCorrect = this.delta(toCol, fromCol) === 0;
    const isFieldBusyByOpponentFigure = this.isFieldBusyByOpponentFigure(toCol, toRow, fields, figureColor);

    if (isRowDeltaCorrect && isColDeltaCorrect && !isFieldBusyByOpponentFigure){
      return true
    }
    return false
  }

  isMoveValid = (fieldFrom, fieldTo, fields, figureColor) => {
    const [fromRow, fromCol] = this.formatter.fieldNameToIndexes(fieldFrom);
    const [toRow, toCol] = this.formatter.fieldNameToIndexes(fieldTo);

    const colorFactor = figureColor === 'white' ? 1 : -1;

    if (
        this.canBeat(fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor) || 
        this.canJump(fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor) || 
        this.canStep(fromRow, fromCol, toRow, toCol, fields, figureColor, colorFactor)
        // TODO : сanTakeOnThePass
       )
    {
      return true
    }
    return false


  }
}

export default PawnValidationService