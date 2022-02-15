const PlayerService = class {
  constructor(figuresFields){
    this.figuresFieldsObj = figuresFields;
    this.selectedFigureField = null;
  }

  getFiguresFields = () => this.figuresFieldsObj;

  removeFromFiguresFields = (fieldName) => {
    delete this.figuresFieldsObj[fieldName]
  }

  changeFigurePosition = (newField) => {
    const {fieldName, isBusy, figure} = this.selectedFigureField;

    delete this.figuresFieldsObj[fieldName]

    this.figuresFieldsObj[newField.fieldName] = {
      fieldName: newField.fieldName,
      isSelected: false,
      isBusy,
      isAvailableToMove: false,
      figure
    }
    return
  }

  getSelectedFigureField = () => this.selectedFigureField;

  setSelectedFigureField = (field) => {
    const fieldsList = Object.values(this.figuresFieldsObj)
    if (fieldsList.includes(field)){
      this.selectedFigureField = field;
      this.figuresFieldsObj[field.fieldName].isSelected = true;
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