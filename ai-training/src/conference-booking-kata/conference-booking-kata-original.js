class ConferenceBooking {
  constructor() {
    this.users = []
    this.seats = Array(100).fill(false) // 100 seats, false means available
  }

  registerUser(name, email, ticketType) {
    if (!name || !email || !ticketType) {
      throw new Error("All fields are required for registration.")
    }
    this.users.push({ name, email, ticketType, seat: null })
  }

  processPayment(email, paymentAmount) {
    const user = this.users.find((user) => user.email === email)
    if (!user) {
      throw new Error("User not found.")
    }
    if (user.ticketType === "VIP" && paymentAmount >= 500) {
      user.paymentStatus = "Paid"
    } else if (user.ticketType === "Standard" && paymentAmount >= 200) {
      user.paymentStatus = "Paid"
    } else {
      throw new Error("Insufficient payment.")
    }
  }

  allocateSeat(email) {
    const user = this.users.find((user) => user.email === email)
    if (!user) {
      throw new Error("User not found.")
    }
    if (user.paymentStatus !== "Paid") {
      throw new Error("Payment required before seat allocation.")
    }
    for (let i = 0; i < this.seats.length; i++) {
      if (!this.seats[i]) {
        this.seats[i] = true
        user.seat = i + 1 // Seat number
        return
      }
    }
    throw new Error("No seats available.")
  }

  getUserInfo(email) {
    const user = this.users.find((user) => user.email === email)
    if (!user) {
      throw new Error("User not found.")
    }
    return user
  }
}

export default ConferenceBooking