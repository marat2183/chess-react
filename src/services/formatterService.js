const FormatterService = class {

  fieldNameToIndexes = (fieldName) => {
    const row = fieldName[0];
    const col = fieldName[1];

    // 'A'.charCodeAt() -> 65 -> 1
    // 'B'.charCodeAt() -> 66 -> 2

    return [Number(row), col.charCodeAt() - 64]
  }

  indexesToFieldName = (rowNumber, colNumber) => {
    const row = rowNumber.toString();
    const col = String.fromCharCode(colNumber + 64)
    return row + col
  }

  getFieldIndex(rowNumber, colNumber){
    const fieldIndex = 8 * (8 - rowNumber) + colNumber - 1;
    return fieldIndex
  }
}

export default FormatterService
