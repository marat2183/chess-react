const ValidationService = class{

  constructor(formatterService){
    this.formatter = formatterService;
    this.maxColNum = 8;
    this.maxRowNum = 8;
    this.minColNum = 1;
    this.minRowNum = 1;
  }

  isFieldFree = (colNumber, rowNumber, fields) => {
    const fieldName = this.formatter.indexesToFieldName(colNumber, rowNumber)
    return !fields[fieldName].isBusy
  };

  isFieldBusyByOpponentFigure = (colNumber, rowNumber, color, fields) => {
    const opponentColor = color === 'white' ? 'black' : 'white';
    const fieldName = this.formatter.indexesToFieldName(colNumber, rowNumber)
    return fields[fieldName].figure?.color === opponentColor;
  }

  isIndexesValid = (colNum, rowNum) => { 
    return (
      (colNum >= this.minColNum && colNum <= this.maxColNum) && 
      (rowNum >= this.minRowNum && rowNum <= this.maxRowNum)
    )
  }

  isAvailableToMove = (col, row, fields) => {
    return (
      this.isIndexesValid(col, row) &&
      this.isFieldFree(col, row, fields)
    )
  }

  isAvailableToBeatOpponentFigure = (col, row, figureColor, fields) => {
    return (
      this.isIndexesValid(col, row) &&
      this.isFieldBusyByOpponentFigure(col, row, figureColor , fields)
    )
  }
}

export default ValidationService