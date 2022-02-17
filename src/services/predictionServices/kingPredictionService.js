import PredictionMoveService from "./predictionMoveService";


const KingPredictionMoveService  = class extends PredictionMoveService{

  getAvailableFieldsToMove = (figure, fieldName, fields) => {
    let availableFieldsToMove = [];
    const [row, col] = this.formatter.fieldNameToIndexes(fieldName);

    if (
        this.validation.isAvailableToMove(col, row + 1, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col, row + 1, figure.color, fields)
       )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col, row + 1))
    }

    if (
        this.validation.isAvailableToMove(col, row - 1, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col, row - 1, figure.color, fields)
       )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col, row - 1))
    }
    
    if (
        this.validation.isAvailableToMove(col + 1, row + 1, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col + 1, row + 1, figure.color, fields)
       )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col + 1, row + 1))
    }

    if (
        this.validation.isAvailableToMove(col + 1, row - 1, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col + 1, row - 1, figure.color, fields)
       )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col + 1, row - 1))
    }

    if (
        this.validation.isAvailableToMove(col - 1, row + 1, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col - 1, row + 1, figure.color, fields)
       )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col - 1, row + 1))
    }

    if (
        this.validation.isAvailableToMove(col - 1, row - 1, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col - 1, row - 1, figure.color, fields)
       )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col - 1, row - 1))
    }

    if (
        this.validation.isAvailableToMove(col + 1, row, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col + 1, row, figure.color, fields)
       )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col + 1, row))
    }

    if (
        this.validation.isAvailableToMove(col - 1, row, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col - 1, row, figure.color, fields)
      )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col - 1, row))
    }

    

    
    return availableFieldsToMove
  }
}

export default KingPredictionMoveService
