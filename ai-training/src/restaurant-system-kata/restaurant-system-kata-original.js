class RestaurantSystem {
  constructor() {
    this.reservations = []
    this.menu = {}
    this.orders = []
  }

  addMenuItem(name, price) {
    if (!name || price <= 0) {
      throw new Error("Invalid menu item details.")
    }
    this.menu[name] = price
  }

  makeReservation(customerName, time, numberOfGuests) {
    if (!customerName || !time || numberOfGuests <= 0) {
      throw new Error("Invalid reservation details.")
    }
    this.reservations.push({ customerName, time, numberOfGuests, status: "Pending" })
  }

  confirmReservation(customerName) {
    const reservation = this.reservations.find((r) => r.customerName === customerName)
    if (!reservation) {
      throw new Error("Reservation not found.")
    }
    reservation.status = "Confirmed"
  }

  cancelReservation(customerName) {
    const index = this.reservations.findIndex((r) => r.customerName === customerName)
    if (index === -1) {
      throw new Error("Reservation not found.")
    }
    this.reservations.splice(index, 1)
  }

  placeOrder(reservationCustomerName, items) {
    const reservation = this.reservations.find((r) => r.customerName === reservationCustomerName)
    if (!reservation || reservation.status !== "Confirmed") {
      throw new Error("Reservation must be confirmed before placing an order.")
    }
    const total = items.reduce((sum, item) => {
      if (!this.menu[item]) {
        throw new Error(`Menu item '${item}' not found.`)
      }
      return sum + this.menu[item]
    }, 0)
    this.orders.push({
      reservationCustomerName,
      items,
      total
    })
    return total
  }

  generateBill(reservationCustomerName) {
    const order = this.orders.find((o) => o.reservationCustomerName === reservationCustomerName)
    if (!order) {
      throw new Error("Order not found.")
    }
    return {
      customerName: reservationCustomerName,
      items: order.items,
      total: order.total
    }
  }

  generateReport() {
    const reservationSummary = this.reservations.map((r) => ({
      customerName: r.customerName,
      time: r.time,
      numberOfGuests: r.numberOfGuests,
      status: r.status
    }))
    const menuSummary = Object.entries(this.menu).map(([name, price]) => ({
      itemName: name,
      price
    }))
    const orderSummary = this.orders.map((o) => ({
      customerName: o.reservationCustomerName,
      total: o.total
    }))
    return {
      reservations: reservationSummary,
      menu: menuSummary,
      orders: orderSummary
    }
  }
}

export default RestaurantSystem