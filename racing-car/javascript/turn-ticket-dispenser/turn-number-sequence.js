class TurnNumberSequence {
  static _turnNumber = 0

  static getNextTurnNumber() {
    return ++TurnNumberSequence._turnNumber
  }
}

module.exports = TurnNumberSequence;
