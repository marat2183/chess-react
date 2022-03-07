const MovingFiguresManagerService = class {
  constructor(
    orderManager,
    validation,
    formatter,
    knightValidation,
    queenValidation,
    bishopValidation,
    rookValidation,
    pawnValidation,
    kingValidation
  )
  {
    this.orderManager = orderManager;
    this.formatter = formatter
    this.validation = validation
    this.knightValidation = knightValidation;
    this.queenValidation = queenValidation;
    this.bishopValidation = bishopValidation;
    this.rookValidation = rookValidation;
    this.pawnValidation = pawnValidation;
    this.kingValidation = kingValidation;
  }

  getFiguresFieldsByColor = (fields, figureColor) => fields.filter(field => field.figure?.color === figureColor)

  getKingField = (fields, figureColor) => {
    const filteredList = fields.filter(field => field.figure?.color === figureColor && field.figure?.type === 'king');
    return filteredList[0]
  };


  getFieldsAfterMove = (selectedField, fieldToMove, fields) => {
    const updatedFields = fields.map(field => {

      if (field.fieldName === fieldToMove.fieldName){
        return {
          ...field,
          figure: selectedField.figure
        }
      }

      if (field.fieldName === selectedField.fieldName){
        return {
          ...field,
          figure: null
        }
      }
      return field
    })
    return updatedFields
  }
  
  getAllOpponentPossibleMoves = (fields) => {
    const opponentFigureColor = this.orderManager.getOrderColor() === 'white' ? 'black' : 'white';
    const opponentFiguresFields = this.getFiguresFieldsByColor(fields, opponentFigureColor)

    const allPossibleMoves = [];

    opponentFiguresFields.forEach(currentField => {
      fields.forEach(fieldToMove => {
        if (
              this.isFieldAvailableToMove(currentField, fieldToMove, fields) && 
              this.isValidFigureMove(currentField, fieldToMove, fields, currentField.figure.color)
           )
        {
          allPossibleMoves.push(fieldToMove.fieldName)
        }
      })
    })

    return allPossibleMoves
  }

  getAllValidPlayerMoves = (fields, figureColor) => {
    const allValidPlayerMoves = {};
    const playerFiguresFields = this.getFiguresFieldsByColor(fields, figureColor);

    playerFiguresFields.forEach(currentField => {
      const figureValidMoves = [];
      fields.forEach(fieldToMove => {
        if (
              this.isFieldAvailableToMove(currentField, fieldToMove, fields) && 
              this.isValidFigureMove(currentField, fieldToMove, fields, currentField.figure.color)&&
              !this.isKingInCheck(currentField, fieldToMove, fields)
           )
        {
          figureValidMoves.push(fieldToMove)
        }
      })
      allValidPlayerMoves[currentField.figure.id.toString()] = figureValidMoves;
    })
    return allValidPlayerMoves
  }

  isKingInCheck = (selectedField, fieldToMove, fields) => {
    const fieldsAfterMove = this.getFieldsAfterMove(selectedField, fieldToMove, fields)
    const kingField = this.getKingField(fieldsAfterMove, selectedField.figure.color)
    const opponentPossibleMoves = this.getAllOpponentPossibleMoves(fieldsAfterMove);
    return opponentPossibleMoves.includes(kingField.fieldName)
  }

  isFieldAvailableToMove = (selectedField, fieldToMove, fields) => {
    const [row, col] = this.formatter.fieldNameToIndexes(fieldToMove.fieldName)
    return this.validation.isFieldAvailableToMove(col, row, fields, selectedField.figure.color)
  }

  isValidFigureMove = (selectedField, fieldToMove, fields, figureColor) => {
    switch (selectedField.figure.type){
      case 'pawn':
        return this.pawnValidation.isMoveValid(selectedField.fieldName, fieldToMove.fieldName, fields, figureColor)
      case 'rook':
        return this.rookValidation.isMoveValid(selectedField.fieldName, fieldToMove.fieldName, fields, figureColor) 
      case 'knight':
        return this.knightValidation.isMoveValid(selectedField.fieldName, fieldToMove.fieldName)
      case 'bishop':
        return this.bishopValidation.isMoveValid(selectedField.fieldName, fieldToMove.fieldName, fields, figureColor)
      case 'queen':
        return  this.queenValidation.isMoveValid(selectedField.fieldName, fieldToMove.fieldName, fields, figureColor)
      case 'king':
       return this.kingValidation.isMoveValid(selectedField.fieldName, fieldToMove.fieldName)
      default:
        break;
    }
  }
}

export default MovingFiguresManagerService