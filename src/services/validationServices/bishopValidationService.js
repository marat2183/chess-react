import ValidationService from "./validationService"

const BishopValidationService = class extends ValidationService {

  isMoveValid = (fieldFrom, fieldTo, fields, figureColor) => {
    const [fromRow, fromCol] = this.formatter.fieldNameToIndexes(fieldFrom);
    const [toRow, toCol] = this.formatter.fieldNameToIndexes(fieldTo);

    const rowStep = this.singOfDelta(toRow, fromRow);
    const colStep = this.singOfDelta(toCol, fromCol);

    if (rowStep === 0 || colStep === 0){
      return false
    }

    let rn = fromRow + rowStep;
    let cn = fromCol + colStep;

    while(this.isIndexesValid(rn, cn)){
      if (!this.isFieldAvailableToMove(cn, rn, fields, figureColor)){
        return false;
      }

      if (rn === toRow && cn === toCol){
        return true
      }

      if (this.isFieldBusyByOpponentFigure(cn, rn, fields, figureColor)){
        return false;
      }

      rn = rn + rowStep;
      cn = cn + colStep;
    }

    return false
  }
}

export default BishopValidationService