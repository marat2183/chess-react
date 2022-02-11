const PlayerService = class {
  constructor(figuresFields){
    this.figuresFieldsObj = figuresFields;
    this.selectedFigureField = null;
  }

  getFiguresFields = () => this.figuresFieldsObj;

  changeFigurePosition = (newField) => {
    const {fieldName, isBusy, figure} = this.selectedFigureField;

    delete this.figuresFieldsObj[fieldName]

    this.figuresFieldsObj[newField.fieldName] = {
      fieldName: newField.fieldName,
      isSelected: false,
      isBusy,
      figure
    }
    return
  }

  getSelectedFigureField = () => this.selectedFigureField;

  setSelectedFigureField = (field) => {
    console.log(field)
    const fieldsList = Object.values(this.figuresFieldsObj)
    console.log(fieldsList.includes(field))
    if (fieldsList.includes(field)){
      this.selectedFigureField = field;
      this.figuresFieldsObj[field.fieldName].isSelected = true;
      console.log(this.figuresFieldsObj)
      return
    }
    throw new Error ('Its not your figure!')
  }

  resetSelectedFigureField = () => {
    this.selectedFigureField = null;
    return
  }
}

export default PlayerService