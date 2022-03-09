import { fieldsInit } from "fieldsData.js";


const BoardManagerService = class {
  constructor(formatter, moveValidation){
    this.formatter = formatter;
    this.moveValidation = moveValidation;
    this.fields = fieldsInit;
  }

  getFields = () => this.fields;

  longCastlingUpdateFields = (currentFigureField, newFigureField) => {
    const [toRow, toCol] = this.formatter.fieldNameToIndexes(newFigureField.fieldName);

    const currentRookFieldIndex = this.formatter.getFieldIndex(toRow, toCol - 2);
    const currentRookField = this.fields[currentRookFieldIndex]

    const newRookFieldIndex = this.formatter.getFieldIndex(toRow, toCol + 1);
    const newRookField = this.fields[newRookFieldIndex]

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

  shortCastlingUpdateFields = (currentFigureField, newFigureField) => {
    const [toRow, toCol] = this.formatter.fieldNameToIndexes(newFigureField.fieldName);

    const currentRookFieldIndex = this.formatter.getFieldIndex(toRow, toCol + 1);
    const currentRookField = this.fields[currentRookFieldIndex]

    const newRookFieldIndex = this.formatter.getFieldIndex(toRow, toCol - 1);
    const newRookField = this.fields[newRookFieldIndex]

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

  updateFieldsHandler = (currentFigureField, newFigureField) => {
    if (this.moveValidation.isTakeOnThePassMove(currentFigureField, newFigureField, this.fields)) 
    {
      this.takeOnThePassUpdateFields(currentFigureField, newFigureField)
      return
    }

    if (this.moveValidation.isLongCastlingMove(currentFigureField, newFigureField))
    {
      this.longCastlingUpdateFields(currentFigureField, newFigureField, )
      return
    }

    if (this.moveValidation.isShortCastlingMove(currentFigureField, newFigureField))
    {
      this.shortCastlingUpdateFields(currentFigureField, newFigureField, )
      return
    }
  
    this.defaultUpdateFields(currentFigureField, newFigureField)
    return
  }
}

export default BoardManagerService