const PredictionMoveService = class {

  constructor(validationService, formatterService){
    this.validation = validationService;
    this.formatter = formatterService;
  }

  isAvailableToMove = (col, row, fields) => {
    return (
      this.validation.isIndexesValid(col, row) &&
      this.validation.isFieldFree(col, row, fields)
    )
  }

  isAvailableToBeatOpponentFigure = (col, row, figureColor, fields) => {
    return (
      this.validation.isIndexesValid(col, row) &&
      this.validation.isFieldBusyByOpponentFigure(col, row, figureColor , fields)
    )
  }
}


export default PredictionMoveService
