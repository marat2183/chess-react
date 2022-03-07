const PlayerService = class {
  constructor(figuresFields){
    this.figures = figuresFields;
    this.selectedField = null;
    this.figureMoveHistory = [];
  }

  getFigures = () => this.figures;

  removeFromFigures = (fieldName) => {
    delete this.figuresFieldsObj[fieldName]
  }

  updateFigureMoveHistory = (figureId) => {
    this.figureMoveHistory = [...this.figureMoveHistory, figureId]
  }

  getSelectedField = () => this.selectedField;

  setSelectedField = (field) => {
    this.selectedField = field;
  }

  resetSelectedField = () => {
    this.selectedField = null;
    return
  }
}

export default PlayerService