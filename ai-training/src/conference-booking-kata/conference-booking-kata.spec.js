import { expect } from "chai"
import ConferenceBooking from "./conference-booking-kata.js"

describe("ConferenceBooking", () => {
  let booking

  beforeEach(() => {
    booking = new ConferenceBooking(5)
  })

  it("should register a user successfully", () => {
    booking.registerUser("John Doe", "john@example.com", "VIP")
    const user = booking.getUserInfo("john@example.com")

    expect(user.name).to.equal("John Doe")
    expect(user.email).to.equal("john@example.com")
    expect(user.ticketType).to.equal("VIP")
  })

  it("should throw an error when required fields are missing during registration", () => {
    expect(() => booking.registerUser("", "john@example.com", "VIP")).to.throw(/All fields are required./)
  })

  it("should process payment successfully for VIP ticket", () => {
    booking.registerUser("John Doe", "john@example.com", "VIP")
    booking.processPayment("john@example.com", 500)
    const user = booking.getUserInfo("john@example.com")
    expect(user.paymentStatus).to.equal("Paid")
  })

  it("should throw an error for insufficient payment", () => {
    booking.registerUser("John Doe", "john@example.com", "VIP")
    expect(() => booking.processPayment("john@example.com", 100)).to.throw(/Insufficient payment./)
  })

  it("should allocate a seat successfully", () => {
    booking.registerUser("John Doe", "john@example.com", "VIP")
    booking.processPayment("john@example.com", 500)
    booking.allocateSeat("john@example.com")
    const user = booking.getUserInfo("john@example.com")
    expect(user.seat > 0).to.be.true
  })

  it("should throw an error if no seats are available", () => {
    for (let i = 0; i < 5; i++) {
      booking.registerUser(`User${i}`, `user${i}@example.com`, "Standard")
      booking.processPayment(`user${i}@example.com`, 200)
      booking.allocateSeat(`user${i}@example.com`)
    }

    booking.registerUser("Extra User", "extra@example.com", "VIP")
    booking.processPayment("extra@example.com", 500)
    expect(() => booking.allocateSeat("extra@example.com")).to.throw(/No seats available./)
  })
})