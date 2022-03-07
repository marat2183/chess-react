
const fieldsInit = [
  {
    fieldName: '8A',
    figure: {
      id: 17,
      type: 'rook',
      color: 'black'
    }
  },
  {
    fieldName: '8B',
    figure: {
      id: 18,
      type: 'knight',
      color: 'black'
    }
  },
  {
    fieldName: '8C',
    figure: {
      id: 19,
      type: 'bishop',
      color: 'black'
    }
  },
  {
    fieldName: '8D',
    figure: {
      id: 20,
      type: 'queen',
      color: 'black'
    }
  },
  {
    fieldName: '8E',
    figure: {
      id: 21,
      type: 'king',
      color: 'black'
    }
  },
  {
    fieldName: '8F',
    figure: {
      id: 22,
      type: 'bishop',
      color: 'black'
    }
  },
  {
    fieldName: '8G',
    figure: {
      id: 23,
      type: 'knight',
      color: 'black'
    }
  },
  {
    fieldName: '8H',
    figure: {
      id: 24,
      type: 'rook',
      color: 'black'
    }
  },
  {
    fieldName: '7A',
    figure: {
      id: 25,
      type: 'pawn',
      color: 'black'
    }
  },
  {
    fieldName: '7B',
    figure: {
      id: 26,
      type: 'pawn',
      color: 'black'
    }
  },
  {
    fieldName: '7C',
    figure: {
      id: 27,
      type: 'pawn',
      color: 'black'
    }
  },
  {
    fieldName: '7D',
    figure: {
      id: 28,
      type: 'pawn',
      color: 'black'
    }
  },
  {
    fieldName: '7E',
    figure: {
      id: 29,
      type: 'pawn',
      color: 'black'
    }
  },
  {
    fieldName: '7F',
    figure: {
      id: 30,
      type: 'pawn',
      color: 'black'
    }
  },
  {
    fieldName: '7G',
    figure: {
      id: 31,
      type: 'pawn',
      color: 'black'
    }
  },
  {
    fieldName: '7H',
    figure: {
      id: 32,
      type: 'pawn',
      color: 'black'
    }
  },
  {
    fieldName: '6A',
    figure: null
  },
  {
    fieldName: '6B',
    figure: null
  },
  {
    fieldName: '6C',
    figure: null
  },
  {
    fieldName: '6D',
    figure: null
  },
  {
    fieldName: '6E',
    figure: null
  },
  {
    fieldName: '6F',
    figure: null
  },
  {
    fieldName: '6G',
    figure: null
  },
  {
    fieldName: '6H',
    figure: null
  },
  {
    fieldName: '5A',
    figure: null
  },
  {
    fieldName: '5B',
    figure: null
  },
  {
    fieldName: '5C',
    figure: null
  },
  {
    fieldName: '5D',
    figure: null
  },
  {
    fieldName: '5E',
    figure: null
  },
  {
    fieldName: '5F',
    figure: null
  },
  {
    fieldName: '5G',
    figure: null
  },
  {
    fieldName: '5H',
    figure: null
  },
  {
    fieldName: '4A',
    figure: null
  },
  {
    fieldName: '4B',
    figure: null
  },
  {
    fieldName: '4C',
    figure: null
  },
  {
    fieldName: '4D',
    figure: null
  },
  {
    fieldName: '4E',
    figure: null
  },
  {
    fieldName: '4F',
    figure: null
  },
  {
    fieldName: '4G',
    figure: null
  },
  {
    fieldName: '4H',
    figure: null
  },
  {
    fieldName: '3A',
    figure: null
  },
  {
    fieldName: '3B',
    figure: null
  },
  {
    fieldName: '3C',
    figure: null
  },
  {
    fieldName: '3D',
    figure: null
  },
  {
    fieldName: '3E',
    figure: null
  },
  {
    fieldName: '3F',
    figure: null
  },
  {
    fieldName: '3G',
    figure: null
  },
  {
    fieldName: '3H',
    figure: null
  },
  {
    fieldName: '2A',
    figure: {
      id: 16,
      type: 'pawn',
      color: 'white'
    }
  },
  {
    fieldName: '2B',
    figure: {
      id: 15,
      type: 'pawn',
      color: 'white'
    }
  },
  {
    fieldName: '2C',
    figure: {
      id: 14,
      type: 'pawn',
      color: 'white'
    }
  },
  {
    fieldName: '2D',
    figure: {
      id: 13,
      type: 'pawn',
      color: 'white'
    }
  },
  {
    fieldName: '2E',
    figure: {
      id: 12,
      type: 'pawn',
      color: 'white'
    }
  },
  {
    fieldName: '2F',
    figure: {
      id: 11,
      type: 'pawn',
      color: 'white'
    }
  },
  {
    fieldName: '2G',
    figure: {
      id: 10,
      type: 'pawn',
      color: 'white'
    }
  },
  {
    fieldName: '2H',
    figure: {
      id: 9,
      type: 'pawn',
      color: 'white'
    }
  },
  {
    fieldName: '1A',
    figure: {
      id: 1,
      type: 'rook',
      color: 'white'
    }
  },
  {
    fieldName: '1B',
    figure: {
      id: 2,
      type: 'knight',
      color: 'white'
    }
  },
  {
    fieldName: '1C',
    figure: {
      id: 3,
      type: 'bishop',
      color: 'white'
    }
  },
  {
    fieldName: '1D',
    figure: {
      id: 4,
      type: 'queen',
      color: 'white'
    }
  },
  {
    fieldName: '1E',
    figure: {
      id: 5,
      type: 'king',
      color: 'white'
    }
  },
  {
    fieldName: '1F',
    figure: {
      id: 6,
      type: 'bishop',
      color: 'white'
    }
  },
  {
    fieldName: '1G',
    figure: {
      id: 7,
      type: 'knight',
      color: 'white'
    }
  },
  {
    fieldName: '1H',
    figure: {
      id: 8,
      type: 'rook',
      color: 'white'
    }
  }
]



const whiteFigures = [
  {
    id: 1,
    type: 'rook',
    color: 'white',
    
  },
  {
    id: 2,
    type: 'knight',
    color: 'white',
    
  },
  {
    id: 3,
    type: 'bishop',
    color: 'white',
    
  },
  {
    id: 4,
    type: 'queen',
    color: 'white',
    
  },
  {
    id: 5,
    type: 'king',
    color: 'white',
    
  },
  {
    id: 6,
    type: 'bishop',
    color: 'white',
    
  },
  {
    id: 7,
    type: 'knight',
    color: 'white',
    
  },
  {
    id: 8,
    type: 'rook',
    color: 'white',
    
  },
  {
    id: 9,
    type: 'pawn',
    color: 'white',
    
  },
  {
    id: 10,
    type: 'pawn',
    color: 'white',
    
  },
  {
    id: 11,
    type: 'pawn',
    color: 'white',
    
  },
  {
    id: 12,
    type: 'pawn',
    color: 'white',
    
  },
  {
    id: 13,
    type: 'pawn',
    color: 'white',
    
  },
  {
    id: 14,
    type: 'pawn',
    color: 'white',
    
  },
  {
    id: 15,
    type: 'pawn',
    color: 'white',
    
  },
  {
    id: 16,
    type: 'pawn',
    color: 'white',
    
  }
]

const blackFigures = [
  {
    id: 17,
    type: 'rook',
    color: 'black',
    
  },
  {
    id: 18,
    type: 'knight',
    color: 'black',
    
  },
  {
    id: 19,
    type: 'bishop',
    color: 'black',
    
  },
  {
    id: 20,
    type: 'queen',
    color: 'black',
    
  },
  {
    id: 21,
    type: 'king',
    color: 'black',
    
  },
  {
    id: 22,
    type: 'bishop',
    color: 'black',
    
  },
  {
    id: 23,
    type: 'knight',
    color: 'black',
    
  },
  {
    id: 24,
    type: 'rook',
    color: 'black',
    
  },
  {
    id: 25,
    type: 'pawn',
    color: 'black',
    
  },
  {
    id: 26,
    type: 'pawn',
    color: 'black',
    
  },
  {
    id: 27,
    type: 'pawn',
    color: 'black',
    
  },
  {
    id: 28,
    type: 'pawn',
    color: 'black',
    
  },
  {
    id: 29,
    type: 'pawn',
    color: 'black',
    
  },
  {
    id: 30,
    type: 'pawn',
    color: 'black',
    
  },
  {
    id: 31,
    type: 'pawn',
    color: 'black',
    
  },
  {
    id: 32,
    type: 'pawn',
    color: 'black',
    
  }
]
export {fieldsInit, whiteFigures, blackFigures}