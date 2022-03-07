const ValidationService = class{

  constructor(formatterService){
    this.formatter = formatterService;
    this.maxColNum = 8;
    this.maxRowNum = 8;
    this.minColNum = 1;
    this.minRowNum = 1;
  }

  delta = (firstNum, secondNum) => firstNum - secondNum;

  absDelta = (firstNum, secondNum) => Math.abs(firstNum - secondNum);

  singOfDelta = (firstNum, secondNum) => Math.sign(firstNum - secondNum)

  isFieldFree = (colNumber, rowNumber, fields) => {
    const fieldIndex = this.formatter.getFieldIndex(colNumber, rowNumber)
    return !fields[fieldIndex].figure
  }

  isFieldAvailableToMove = (colNumber, rowNumber, fields, figureColor) => {
    const fieldIndex = this.formatter.getFieldIndex(colNumber, rowNumber)
    return fields[fieldIndex].figure?.color !== figureColor
  };

  isFieldBusyByOpponentFigure(colNumber, rowNumber, fields, figureColor){
    const opponentColor = figureColor === "white" ? "black" : 'white'
    const fieldIndex = this.formatter.getFieldIndex(colNumber, rowNumber)
    return fields[fieldIndex].figure?.color === opponentColor
  }

  isIndexesValid = (rowNum, colNum) => { 
    return (
      (colNum >= this.minColNum && colNum <= this.maxColNum) && 
      (rowNum >= this.minRowNum && rowNum <= this.maxRowNum)
    )
  }
}

export default ValidationService