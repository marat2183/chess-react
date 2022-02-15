import PredictionMoveService from "./predictionMoveService";


const RookPredictionMoveService  = class extends PredictionMoveService{

  getAvailableFieldsToMove = (figure, fieldName, fields) => {
    let availableFieldsToMove = [];
    const [rowInit, colInit] = this.formatter.fieldNameToIndexes(fieldName);
    
    let ci = colInit + 1;
    while(this.validation.isAvailableToMove(ci, rowInit, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(ci, rowInit))
      ci++;
    }
    if (this.validation.isAvailableToBeatOpponentFigure(ci, rowInit, figure.color, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(ci, rowInit))
    }
    
    let cj = colInit - 1;
    while(this.validation.isAvailableToMove(cj, rowInit, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(cj, rowInit))
      cj--;
    }
    if (this.validation.isAvailableToBeatOpponentFigure(cj, rowInit, figure.color, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(cj, rowInit))
    }
    
    let ri = rowInit + 1;
    while(this.validation.isAvailableToMove(colInit, ri, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(colInit, ri))
      ri++;
    }
    if (this.validation.isAvailableToBeatOpponentFigure(colInit, ri, figure.color, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(colInit, ri))
    }

    let rj = rowInit - 1;
    while(this.validation.isAvailableToMove(colInit, rj, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(colInit, rj))
      rj--;
    }
    if (this.validation.isAvailableToBeatOpponentFigure(colInit, rj, figure.color, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(colInit, rj))
    }
    
    return availableFieldsToMove
  }
}

export default RookPredictionMoveService
