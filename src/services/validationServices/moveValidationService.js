import ValidationService from "./validationService"

const MoveValidationService = class extends ValidationService {

  isTakeOnThePassMove = (currentFigureField, newFigureField, fields) => {
    const [fromRow, fromCol] = this.formatter.fieldNameToIndexes(currentFigureField.fieldName);
    const [toRow, toCol] = this.formatter.fieldNameToIndexes(newFigureField.fieldName);

    if (!currentFigureField.figure.type === 'pawn'){
      return false;
    }
    
    if (!this.isFieldFree(toRow, toCol, fields)){
      return false;
    }

    if (!(this.delta(toCol, fromCol) === 1 || this.delta(toCol, fromCol) === -1)){
      return false;
    }

    if (!(this.delta(toRow, fromRow) === 1 || this.delta(toRow, fromRow) === -1)){
      return false
    }

    return true
  }

  isLongCastlingMove = (currentFigureField, newFigureField) => {
    const [, fromCol] = this.formatter.fieldNameToIndexes(currentFigureField.fieldName);
    const [, toCol] = this.formatter.fieldNameToIndexes(newFigureField.fieldName);

    return currentFigureField.figure.type === 'king' && this.delta(toCol, fromCol) === -2
  }

  isShortCastlingMove = (currentFigureField, newFigureField) => {
    const [, fromCol] = this.formatter.fieldNameToIndexes(currentFigureField.fieldName);
    const [, toCol] = this.formatter.fieldNameToIndexes(newFigureField.fieldName);

    return currentFigureField.figure.type === 'king' && this.delta(toCol, fromCol) === 2
  }

  
}

export default MoveValidationService