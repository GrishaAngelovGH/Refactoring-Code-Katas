class ConferenceBooking {
  constructor(seatsNumber) {
    this.users = []
    this.seats = Array(seatsNumber).fill().map(() => ({ available: true }))
  }

  registerUser(name, email, ticketType) {
    validateRegistrationFields(name, email, ticketType)

    createNewUser(name, email, ticketType, this.users)
  }

  processPayment(email, paymentAmount) {
    const user = getUserBy({ email }, this.users)

    updatePaymentStatusByTicketType(user, paymentAmount)
  }

  allocateSeat(email) {
    const user = getUserBy({ email }, this.users)

    allocateNextAvailableSeat(user, this.seats)
  }

  getUserInfo(email) {
    return getUserBy({ email }, this.users)
  }
}

const validateRegistrationFields = (name, email, ticketType) => {
  if (!name || !email || !ticketType) {
    throw new Error("All fields are required for registration.")
  }
}

const createNewUser = (name, email, ticketType, users) => {
  users.push({ name, email, ticketType, paymentStatus: null, seat: null })
}

const getUserBy = (criteria, users) => {
  const [key, value] = Object.entries(criteria)[0]

  const user = users.find((user) => user[key] === value)

  if (!user) {
    throw new Error("User not found.")
  }

  return user
}

const updatePaymentStatusByTicketType = (user, paymentAmount) => {
  const ticketTypes = {
    "VIP": 500,
    "Standard": 200
  }

  const minimalAmount = ticketTypes[user.ticketType]

  if (paymentAmount >= minimalAmount) {
    user.paymentStatus = "Paid"
    return
  }

  throw new Error("Insufficient payment.")
}

const allocateNextAvailableSeat = (user, seats) => {
  if (user.paymentStatus !== "Paid") {
    throw new Error("Payment required before seat allocation.")
  }

  for (let i = 0; i < seats.length; i++) {
    if (seats[i].available) {
      seats[i].available = false
      user.seat = i + 1
      return
    }
  }

  throw new Error("No seats available.")
}

export default ConferenceBooking