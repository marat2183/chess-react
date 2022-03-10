import ValidationService from "./validationService"

const KingMoveValidationService = class extends ValidationService {

  isRookInField = (row, col, fields, figureColor) => {
    const fieldIndex = this.formatter.getFieldIndex(row, col)
    return fields[fieldIndex].figure?.type === 'rook' && fields[fieldIndex].figure?.color === figureColor
  }

  isFirstMove = (row, col, fields, playerMoveHistory) => {
    const fieldIndex = this.formatter.getFieldIndex(row, col);
    const figureIdToCheck = fields[fieldIndex].figure?.id
    const isItFirstOpponentMoveForFigure = playerMoveHistory.filter(figureId => figureId === figureIdToCheck).length === 0;
    return isItFirstOpponentMoveForFigure
  }

  isFieldsFree = (fieldsToCheck, fields) => {
    fieldsToCheck.forEach(field => {
      if (!this.isFieldFree(field[0], field[1], fields)){
        return false
      }
    })
    return true
  }

  isFieldsInCheck = (fieldsToCheck, opponentPossibleMoves) => {
    fieldsToCheck.forEach(field => {
      const fieldName = this.formatter.indexesToFieldName(field[0], field[1])
      if (opponentPossibleMoves.includes(fieldName)){
        return false
      }
    })
    return true
  }

  canLongCastling = (fromRow, fromCol, toRow, toCol, fields, figureColor, playerMoveHistory, opponentPossibleMoves) => {
    
    const isFromRowCorrect = figureColor === 'white' ? fromRow === 1 : fromRow === 8
    if (!isFromRowCorrect){
      return false
    }

    const isFromColCorrect = fromCol === 5;
    if (!isFromColCorrect){
      return false
    }

    const isToRowCorrect = figureColor === 'white' ? toRow === 1 : toRow === 8;
    if (!isToRowCorrect){
      return false
    }

    const isToColCorrect = toCol === 3;
    if (!isToColCorrect){
      return false
    }

    const isRookPositionCorrect = figureColor === 'white' ? 
    this.isRookInField(1, 1, fields, figureColor) :
    this.isRookInField(8, 1, fields, figureColor)
    if (!isRookPositionCorrect){
      return false
    }

    const isFirstMoveForKing = this.isFirstMove(fromRow, fromCol, fields, playerMoveHistory);
    if (!isFirstMoveForKing){
      return false
    }

    const isFirstMoveForRook = figureColor === 'white' ?
    this.isFirstMove(1, 1, fields, playerMoveHistory) :
    this.isFirstMove(8, 1, fields, playerMoveHistory)
    if (!isFirstMoveForRook){
      return false
    }

    const fieldsToCheckOnFree = figureColor === 'white' ? [[1,4], [1,3], [1,2]] : [[8,4], [8,3], [8,2]]
    const isFieldsFree = this.isFieldsFree(fieldsToCheckOnFree, fields)
    if (!isFieldsFree){
      return false
    }

    const fieldsToCheckOnCheck = figureColor === 'white' ? [[1,5], [1,4], [1,3]] : [[8,5], [8,4], [8,3]]
    const isFieldsInCheck = this.isFieldsInCheck(fieldsToCheckOnCheck, opponentPossibleMoves)
    if (!isFieldsInCheck){
      return false
    }
    return true
  }

  canShortCastling = (fromRow, fromCol, toRow, toCol, fields, figureColor, playerMoveHistory, opponentPossibleMoves) => {
    const isFromRowCorrect = figureColor === 'white' ? fromRow === 1 : fromRow === 8
    if (!isFromRowCorrect){
      return false
    }

    const isFromColCorrect = fromCol === 5;
    if (!isFromColCorrect){
      return false
    }

    const isToRowCorrect = figureColor === 'white' ? toRow === 1 : toRow === 8;
    if (!isToRowCorrect){
      return false
    }

    const isToColCorrect = toCol === 7;
    if (!isToColCorrect){
      return false
    }

    const isRookPositionCorrect = figureColor === 'white' ? 
    this.isRookInField(1, 8, fields, figureColor) :
    this.isRookInField(8, 8, fields, figureColor)
    if (!isRookPositionCorrect){
      return false
    }

    const isFirstMoveForKing = this.isFirstMove(fromRow, fromCol, fields, playerMoveHistory);
    if (!isFirstMoveForKing){
      return false
    }

    const isFirstMoveForRook = figureColor === 'white' ?
    this.isFirstMove(1, 8, fields, playerMoveHistory) :
    this.isFirstMove(8, 8, fields, playerMoveHistory)
    if (!isFirstMoveForRook){
      return false
    }

    const fieldsToCheckOnFree = figureColor === 'white' ? [[1,6], [1,7]] : [[8,6], [8,7]]
    const isFieldsFree = this.isFieldsFree(fieldsToCheckOnFree, fields)
    if (!isFieldsFree){
      return false
    }

    const fieldsToCheckOnCheck = figureColor === 'white' ? [[1,5], [1,6], [1,7]] : [[8,5], [8,6], [8,7]]
    const isFieldsInCheck = this.isFieldsInCheck(fieldsToCheckOnCheck, opponentPossibleMoves)
    if (!isFieldsInCheck){
      return false
    }
    return true
  }

  canStepOrBeat = (fromRow, fromCol, toRow, toCol) => {
    
    const isRowDeltaCorrect = this.delta(toRow, fromRow) >= -1 && this.delta(toRow, fromRow) <= 1;
    const isColDeltaCorrect = this.delta(toCol, fromCol) >= -1 && this.delta(toCol, fromCol) <= 1;

    if (isRowDeltaCorrect && isColDeltaCorrect){
      return true
    }
    return false
  }

  isMoveValid = (fieldFrom, fieldTo,  fields, figureColor, orderColor, playerMoveHistory, opponentPossibleMoves = []) => {

    const [fromRow, fromCol] = this.formatter.fieldNameToIndexes(fieldFrom);
    const [toRow, toCol] = this.formatter.fieldNameToIndexes(fieldTo);


    if (figureColor === orderColor){
      if (
          this.canStepOrBeat(fromRow, fromCol, toRow, toCol) ||
          this.canLongCastling(fromRow, fromCol, toRow, toCol, fields, figureColor, playerMoveHistory, opponentPossibleMoves) ||
          this.canShortCastling(fromRow, fromCol, toRow, toCol, fields, figureColor, playerMoveHistory, opponentPossibleMoves)
         )
      {
        return true
      }
      return false
    }

    if (this.canStepOrBeat(fromRow, fromCol, toRow, toCol)){
      return true
    }
    return false
  }
}

export default KingMoveValidationService