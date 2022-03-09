const OrderManagerService = class {
  constructor(whiteFigurePlayer, blackFigurePlayer, orderColor){
    this.orderColor = orderColor
    this.whiteFigurePlayer = whiteFigurePlayer
    this.blackFigurePlayer = blackFigurePlayer
  }

  getOrderColor = () => this.orderColor

  getOpponentColor = () => {
    return this.orderColor === "white" ? 'black' : 'white';
  }

  toggleOrder = () => {
    this.orderColor = this.orderColor === 'white' ? 'black' : 'white';
  }

  getPlayerByOrder = () => {
    const player = this.orderColor === 'white' ? this.whiteFigurePlayer : this.blackFigurePlayer;
    return player
  }

  getOpponentPlayer = () => {
    const opponentPlayer = this.orderColor === 'white' ? this.blackFigurePlayer : this.whiteFigurePlayer;
    return opponentPlayer
  }
}

export default OrderManagerService