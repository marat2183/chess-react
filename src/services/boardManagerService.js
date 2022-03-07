import { fieldsInit } from "fieldsData.js";


const BoardManagerService = class {
  constructor(){
    this.fields = fieldsInit;
  }

  getFields = () => this.fields;

  setFields = (fields) => {
    this.fields = fields;
  }

  updateFields = (currentField, newField) => {
    const updatedFields = this.fields.map(field => {
      if (field.fieldName === newField.fieldName){
        return {
          ...field,
          figure: currentField.figure
        }
      }

      if (field.fieldName === currentField.fieldName){
        return {
          ...field,
          figure: null
        }
      }

      return field
    })

    this.setFields(updatedFields)
  }
}

export default BoardManagerService