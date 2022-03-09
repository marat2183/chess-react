import { fieldsInit } from "fieldsData.js";


const BoardManagerService = class {
  constructor(formatter, moveTypeValidation){
    this.formatter = formatter;
    this.moveTypeValidation = moveTypeValidation;
    this.fields = fieldsInit;
  }

  getFields = () => this.fields;

  castlingUpdateFields = (currentFigureField, newFigureField, currentRookField, newRookField) => {
    const updatedFields = this.fields.map(field => {
      if (field.fieldName === newFigureField.fieldName){
        return {
          ...field,
          figure: currentFigureField.figure
        }
      }

      if (field.fieldName === currentFigureField.fieldName){
        return {
          ...field,
          figure: null
        }
      }

      if (field.fieldName === currentRookField.fieldName){
        return {
          ...field,
          figure: null
        }
      }

      if (field.fieldName === newRookField.fieldName){
        return {
          ...field,
          figure: {
            id: currentRookField.figure.color === 'white' ? 1 : 17,
            type: 'rook',
            color: currentRookField.figure.color
          }
        }
      }
      return field
    })
    this.fields = updatedFields
  }

  pawnPromotionUpdateFields = (currentFigureField, newFigureField) => {
    const updatedFields = this.fields.map(field => {
      if (field.fieldName === newFigureField.fieldName){
        return {
          ...field,
          figure: {
            ...currentFigureField.figure,
            type: 'queen'
          }
        }
      }

      if (field.fieldName === currentFigureField.fieldName){
        return {
          ...field,
          figure: null
        }
      }
      return field
    })

    this.fields = updatedFields
  }

  takeOnThePassUpdateFields = (currentFigureField, newFigureField) => {
    const [toRow, toCol] = this.formatter.fieldNameToIndexes(newFigureField.fieldName);
    
    const colorFactor = currentFigureField.figure.color === 'white' ? 1 : -1;

    const figureFieldToDeleteIndex = this.formatter.getFieldIndex(toRow - colorFactor, toCol)
    const figureFieldToDelete = this.fields[figureFieldToDeleteIndex]
    
    const updatedFields = this.fields.map(field => {
      if (field.fieldName === newFigureField.fieldName){
        return {
          ...field,
          figure: currentFigureField.figure
        }
      }

      if (field.fieldName === currentFigureField.fieldName){
        return {
          ...field,
          figure: null
        }
      }

      if (field.fieldName === figureFieldToDelete.fieldName){
        return {
          ...field,
          figure: null
        }
      }
      return field
    })

    this.fields = updatedFields
  }

  defaultUpdateFields = (currentFigureField, newFigureField) => {
    const updatedFields = this.fields.map(field => {
      if (field.fieldName === newFigureField.fieldName){
        return {
          ...field,
          figure: currentFigureField.figure
        }
      }

      if (field.fieldName === currentFigureField.fieldName){
        return {
          ...field,
          figure: null
        }
      }
      return field
    })

    this.fields = updatedFields
  }

  longCastlingHandler = (currentFigureField, newFigureField) => {
    const [toRow, toCol] = this.formatter.fieldNameToIndexes(newFigureField.fieldName);

    const currentRookFieldIndex = this.formatter.getFieldIndex(toRow, toCol - 2);
    const currentRookField = this.fields[currentRookFieldIndex]

    const newRookFieldIndex = this.formatter.getFieldIndex(toRow, toCol + 1);
    const newRookField = this.fields[newRookFieldIndex]

    this.castlingUpdateFields(currentFigureField, newFigureField, currentRookField, newRookField)
  }

  shortCastlingHandler = (currentFigureField, newFigureField) => {
    const [toRow, toCol] = this.formatter.fieldNameToIndexes(newFigureField.fieldName);

    const currentRookFieldIndex = this.formatter.getFieldIndex(toRow, toCol + 1);
    const currentRookField = this.fields[currentRookFieldIndex]

    const newRookFieldIndex = this.formatter.getFieldIndex(toRow, toCol - 1);
    const newRookField = this.fields[newRookFieldIndex]

    this.castlingUpdateFields(currentFigureField, newFigureField, currentRookField, newRookField)
  }

  

  updateFieldsHandler = (currentFigureField, newFigureField) => {

    if (this.moveTypeValidation.isPawnPromotionMove(currentFigureField, newFigureField)){
      this.pawnPromotionUpdateFields(currentFigureField, newFigureField)
      return
    }

    if (this.moveTypeValidation.isTakeOnThePassMove(currentFigureField, newFigureField, this.fields)) 
    {
      this.takeOnThePassUpdateFields(currentFigureField, newFigureField)
      return
    }

    if (this.moveTypeValidation.isLongCastlingMove(currentFigureField, newFigureField))
    {
      this.longCastlingHandler(currentFigureField, newFigureField, )
      return
    }

    if (this.moveTypeValidation.isShortCastlingMove(currentFigureField, newFigureField))
    {
      this.shortCastlingHandler(currentFigureField, newFigureField, )
      return
    }
  
    this.defaultUpdateFields(currentFigureField, newFigureField)
    return
  }
}

export default BoardManagerService