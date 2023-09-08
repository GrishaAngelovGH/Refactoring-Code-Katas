const TurnNumberSequence = require('./turn-number-sequence.js')
const TurnTicket = require('./turn-ticket.js')

class TicketDispenser {
  constructor() {
    this.turnNumber = 0
  }

  getTurnTicket() {
    const nextTurnNumber = this.turnNumber < TurnNumberSequence._turnNumber ?
      ++this.turnNumber : TurnNumberSequence.getNextTurnNumber()

    return new TurnTicket(nextTurnNumber)
  }
}

module.exports = TicketDispenser
