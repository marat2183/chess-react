const MovingFiguresManagerService = class {
  constructor(
    orderManager,
    validation,
    formatter,
    knightMoveValidation,
    queenMoveValidation,
    bishopMoveValidation,
    rookMoveValidation,
    pawnMoveValidation,
    kingMoveValidation
  )
  {
    this.orderManager = orderManager;
    this.formatter = formatter
    this.validation = validation
    this.knightMoveValidation = knightMoveValidation;
    this.queenMoveValidation = queenMoveValidation;
    this.bishopMoveValidation = bishopMoveValidation;
    this.rookMoveValidation = rookMoveValidation;
    this.pawnMoveValidation = pawnMoveValidation;
    this.kingMoveValidation = kingMoveValidation;
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
    return this.validation.isFieldAvailableToMove(row, col, fields, selectedField.figure.color)
  }

  isValidFigureMove = (selectedField, fieldToMove, fields, figureColor) => {
    switch (selectedField.figure.type){
      case 'pawn':
        const opponentPlayer = this.orderManager.getOpponentPlayer();
        return this.pawnMoveValidation.isMoveValid(
          selectedField.fieldName, 
          fieldToMove.fieldName, 
          fields, 
          figureColor,
          opponentPlayer.figureMoveHistory
          )
      case 'rook':
        return this.rookMoveValidation.isMoveValid(
          selectedField.fieldName, 
          fieldToMove.fieldName, 
          fields, 
          figureColor
        ) 
      case 'knight':
        return this.knightMoveValidation.isMoveValid(
          selectedField.fieldName, 
          fieldToMove.fieldName
        )
      case 'bishop':
        return this.bishopMoveValidation.isMoveValid(
          selectedField.fieldName, 
          fieldToMove.fieldName, 
          fields, 
          figureColor
        )
      case 'queen':
        return  this.queenMoveValidation.isMoveValid(
          selectedField.fieldName, 
          fieldToMove.fieldName, 
          fields, 
          figureColor
        )
      case 'king':
        const orderColor = this.orderManager.getOrderColor();
        const player = this.orderManager.getPlayerByOrder();
        if (figureColor === orderColor){
          const opponentPossibleMoves = this.getAllOpponentPossibleMoves(fields)
          return this.kingMoveValidation.isMoveValid(
            selectedField.fieldName, 
            fieldToMove.fieldName, 
            fields, 
            figureColor, 
            orderColor,
            player.figureMoveHistory,
            opponentPossibleMoves
          )
        }
        return this.kingMoveValidation.isMoveValid(
          selectedField.fieldName, 
          fieldToMove.fieldName, 
          fields, 
          figureColor, 
          orderColor,
          player.figureMoveHistory,
          )
      default:
        break;
    }
  }
}

export default MovingFiguresManagerService