import ValidationService from "./validationService"

const KnightValidationService = class extends ValidationService {

  isMoveValid = (fieldFrom, fieldTo) => {
    const [fromRow, fromCol] = this.formatter.fieldNameToIndexes(fieldFrom);
    const [toRow, toCol] = this.formatter.fieldNameToIndexes(fieldTo);

    if (this.absDelta(toRow, fromRow) === 2 && this.absDelta(toCol, fromCol) === 1){
      return true
    }

    if (this.absDelta(toRow, fromRow) === 1 && this.absDelta(toCol, fromCol) === 2){
      return true
    }

    return false
  }
}

export default KnightValidationService