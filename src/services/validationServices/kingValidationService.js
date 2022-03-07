import ValidationService from "./validationService"

const KingValidationService = class extends ValidationService {

  isMoveValid = (fieldFrom, fieldTo) => {

    const [fromRow, fromCol] = this.formatter.fieldNameToIndexes(fieldFrom);
    const [toRow, toCol] = this.formatter.fieldNameToIndexes(fieldTo);

    if (fromRow === toRow && fromCol === toCol){
      return false;
    }

    const isRowDeltaCorrect = this.delta(toRow, fromRow) >= -1 && this.delta(toRow, fromRow) <= 1;
    const isColDeltaCorrect = this.delta(toCol, fromCol) >= -1 && this.delta(toCol, fromCol) <= 1;

    if (isRowDeltaCorrect && isColDeltaCorrect){
      return true
    }
    return false
  }
}

export default KingValidationService