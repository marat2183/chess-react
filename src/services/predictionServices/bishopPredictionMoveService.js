import PredictionMoveService from "./predictionMoveService";


const BishopPredictionMoveService  = class extends PredictionMoveService{

  getAvailableFieldsToMove = (figure, fieldName, fields) => {
    let availableFieldsToMove = [];
    const [row, col] = this.formatter.fieldNameToIndexes(fieldName);
    
    let ci = col + 1;
    let ri = row + 1
    while(this.validation.isAvailableToMove(ci, ri, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(ci, ri))
      ci++;
      ri++;
    }
    if (this.validation.isAvailableToBeatOpponentFigure(ci, ri, figure.color, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(ci, ri))
    }
    
    let cj = col - 1;
    let rj = row - 1;
    while(this.validation.isAvailableToMove(cj, rj, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(cj, rj))
      cj--;
      rj--;
    }
    if (this.validation.isAvailableToBeatOpponentFigure(cj, rj, figure.color, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(cj, rj))
    }
    
    let ck = col - 1;
    let rk = row + 1;
    while(this.validation.isAvailableToMove(ck, rk, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(ck, rk))
      ck--;
      rk++;
    }
    if (this.validation.isAvailableToBeatOpponentFigure(ck, rk, figure.color, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(ck, rk))
    }

    let cn = col + 1;
    let rn = row - 1;
    while(this.validation.isAvailableToMove(cn, rn, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(cn, rn))
      cn++;
      rn--;
    }
    if (this.validation.isAvailableToBeatOpponentFigure(cn, rn, figure.color, fields)){
      availableFieldsToMove.push(this.formatter.indexesToFieldName(cn, rn))
    }
    
    return availableFieldsToMove
  }
}

export default BishopPredictionMoveService
