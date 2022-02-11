import PredictionMoveService from "./predictionMoveService";


const PawnPredictionService  = class extends PredictionMoveService{
  
  getAvailableFieldsToMove = (figure, fieldName, fields) => {
    let availableFieldsToMove = [];

    const colorFactor = figure.color === 'white' ? 1: -1;
    const defaultRow = figure.color === 'white' ? 2: 7;
    
    let [row, col] = this.formatter.fieldNameToIndexes(fieldName)

    if ( 
          this.validation.isIndexesValid(col, row + 1 * colorFactor) &&
          this.validation.isFieldFree(col, row + 1 * colorFactor, fields)
        )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col, row + 1 * colorFactor))
    }
    if (
        this.validation.isIndexesValid(col + 1 , row + 1 * colorFactor) &&
        !this.validation.isFieldFree(col + 1, row + 1 * colorFactor, fields) && 
        this.validation.isFieldBusyByOpponentFigure(col + 1, row + 1 * colorFactor, figure.color, fields)
        )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col + 1, row + 1 * colorFactor))
    }
    if (
        this.validation.isIndexesValid(col - 1, row + 1 * colorFactor) &&
        !this.validation.isFieldFree(col - 1, row + 1 * colorFactor, fields) && 
        this.validation.isFieldBusyByOpponentFigure(col - 1, row + 1 * colorFactor, figure.color, fields)
        )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col - 1, row + 1 * colorFactor))
    }

    if (row === defaultRow && this.validation.isFieldFree(col, row + 2 * colorFactor, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col, row + 2 * colorFactor))
    }
    return availableFieldsToMove
  }
}

export default PawnPredictionService
