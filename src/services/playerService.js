const PlayerService = class {
  constructor(figuresFields){
    this.figuresFieldsObj = figuresFields;
    this.selectedFigureField = null;
  }

  getFiguresFields = () => this.figuresFieldsObj;

  changeFigurePosition = (newFieldName) => {
    const {fieldName, isActive, isBusy, figure} = this.selectedFigureField
    delete this.figuresFieldsObj[fieldName]
    this.figuresFieldsObj[newFieldName] = {
      fieldName: newFieldName,
      isActive,
      isBusy,
      figure
    }
    return
  }

  getSelectedFigureField = () => this.selectedFigureField;

  setSelectedFigureField = (field) => {
    const fieldsList = Object.values(this.figuresFieldsObj)
    if (fieldsList.includes(field)){
      this.selectedFigureField = field;
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