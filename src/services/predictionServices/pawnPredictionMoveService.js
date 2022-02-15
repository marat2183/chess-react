import PredictionMoveService from "./predictionMoveService";


const PawnPredictionMoveService  = class extends PredictionMoveService{

  getAvailableFieldsToMove = (figure, fieldName, fields) => {
    let availableFieldsToMove = [];

    const colorFactor = figure.color === 'white' ? 1: -1;
    const defaultRow = figure.color === 'white' ? 2: 7;
    
    let [row, col] = this.formatter.fieldNameToIndexes(fieldName)

    if (this.validation.isAvailableToMove(col, row + 1 * colorFactor, fields))
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col, row + 1 * colorFactor))
    }

    if (this.validation.isAvailableToBeatOpponentFigure(
      col + 1, 
      row + 1 * colorFactor, 
      figure.color, 
      fields
    ))
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col + 1, row + 1 * colorFactor))
    }

    if (this.validation.isAvailableToBeatOpponentFigure(
      col - 1, row + 1 * colorFactor, 
      figure.color, 
      fields
    ))
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col - 1, row + 1 * colorFactor))
    }

    if (row === defaultRow && this.validation.isAvailableToMove(col, row + 2 * colorFactor, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col, row + 2 * colorFactor))
    }

    return availableFieldsToMove
  }
}

export default PawnPredictionMoveService
