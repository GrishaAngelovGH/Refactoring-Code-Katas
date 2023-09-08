const chai = require('chai')
chai.should()

const TicketDispenser = require('../turn-ticket-dispenser/ticket-dispenser.js')

describe('Turn Ticket Dispenser', function () {
  it('should provide next turn ticket from TicketDispenser', function () {
    const dispenser = new TicketDispenser()
    const ticket = dispenser.getTurnTicket()
    ticket.turnNumber().should.equal(1)
  })

  it('should provide own set of turn tickets for different TicketDispensers', function () {
    const dispenser1 = new TicketDispenser()
    const dispenser2 = new TicketDispenser()
    const dispenser3 = new TicketDispenser()

    const ticket1 = dispenser1.getTurnTicket()
    const ticket2 = dispenser1.getTurnTicket()
    const ticket3 = dispenser2.getTurnTicket()
    const ticket4 = dispenser3.getTurnTicket()
    const ticket5 = dispenser3.getTurnTicket()
    const ticket6 = dispenser3.getTurnTicket()

    ticket1.turnNumber().should.equal(1)
    ticket2.turnNumber().should.equal(2)
    ticket3.turnNumber().should.equal(1)
    ticket4.turnNumber().should.equal(1)
    ticket5.turnNumber().should.equal(2)
    ticket6.turnNumber().should.equal(3)
  })
})
