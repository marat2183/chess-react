import PredictionMoveService from "./predictionMoveService";


const KnightPredictionMoveService  = class extends PredictionMoveService{

  getAvailableFieldsToMove = (figure, fieldName, fields) => {
    let availableFieldsToMove = [];
    const [row, col] = this.formatter.fieldNameToIndexes(fieldName);

    if (
        this.validation.isAvailableToMove(col + 1, row + 2, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col + 1, row + 2, figure.color, fields)
       )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col + 1, row + 2))
    }

    if (
        this.validation.isAvailableToMove(col - 1, row + 2, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col - 1, row + 2, figure.color, fields)
       )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col - 1, row + 2))
    }

    if (
        this.validation.isAvailableToMove(col + 1, row - 2, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col + 1, row - 2, figure.color, fields)
      )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col + 1, row - 2))
    }

    if (
        this.validation.isAvailableToMove(col - 1, row - 2, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col - 1, row - 2, figure.color, fields)
      )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col - 1, row - 2))
    }

    if (
        this.validation.isAvailableToMove(col + 2, row + 1, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col + 2, row + 1, figure.color, fields)
      )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col + 2, row + 1))
    }

    if (
        this.validation.isAvailableToMove(col + 2, row - 1, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col + 2, row - 1, figure.color, fields)
      )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col + 2, row - 1))
    }
    
    if (
        this.validation.isAvailableToMove(col - 2, row + 1, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col - 2, row + 1, figure.color, fields)
      )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col - 2, row + 1))
    }

    if (
        this.validation.isAvailableToMove(col - 2, row - 1, fields) ||
        this.validation.isAvailableToBeatOpponentFigure(col - 2, row - 1, figure.color, fields)
      )
    {
      availableFieldsToMove.push(this.formatter.indexesToFieldName(col - 2, row - 1))
    }
    
    return availableFieldsToMove
  }
}

export default KnightPredictionMoveService
