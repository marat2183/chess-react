const ValidationService = class{

  constructor(formatterService){
    this.formatter = formatterService
  }

  isFieldFree = (colNumber, rowNumber, fields) => {
    const fieldName = this.formatter.indexesToFieldName(colNumber, rowNumber)
    console.log(fieldName)
    return !fields[fieldName].isBusy
  };

  isFieldBusyByOpponentFigure = (colNumber, rowNumber, color, fields) => {
    const opponentColor = color === 'white' ? 'black' : 'white';
    const fieldName = this.formatter.indexesToFieldName(colNumber, rowNumber)
    return fields[fieldName].figure.color === opponentColor;
  }

  isIndexesValid = (colNum, rowNum) => { 
    return (colNum >= 1 && colNum <= 8) && (rowNum >= 1 && rowNum <= 8)
  }
}

export default ValidationService