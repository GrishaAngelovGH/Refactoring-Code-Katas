class RestaurantSystem {
  constructor() {
    this.reservations = []
    this.menu = {}
    this.orders = []
  }

  addMenuItem(name, price) {
    validateItem(name, price)

    this.menu[name] = price
  }

  makeReservation(customerName, time, numberOfGuests) {
    validateReservation(customerName, time, numberOfGuests)

    createNewReservation(customerName, time, numberOfGuests, this.reservations)
  }

  confirmReservation(customerName) {
    const reservation = getReservationBy(customerName, this.reservations)

    markAsConfirmed(reservation)
  }

  cancelReservation(customerName) {
    const index = this.reservations.findIndex((r) => r.customerName === customerName)

    if (index === -1) {
      throw new Error("Reservation not found.")
    }

    this.reservations.splice(index, 1)
  }

  placeOrder(reservationCustomerName, items) {
    checkConfirmedReservation(reservationCustomerName, this.reservations)

    const total = calculateOrderTotal(items, this.menu)

    this.orders.push({
      reservationCustomerName,
      items,
      total
    })

    return total
  }

  generateBill(reservationCustomerName) {
    const { items, total } = getOrderByCustomerName(reservationCustomerName, this.orders)

    return {
      customerName: reservationCustomerName,
      items,
      total
    }
  }

  generateReport() {
    const menuSummary = Object.entries(this.menu).map(([name, price]) => ({
      itemName: name,
      price
    }))

    return {
      menu: menuSummary,
      reservations: this.reservations,
      orders: this.orders
    }
  }
}

const validateReservation = (customerName, time, numberOfGuests) => {
  if (!customerName || !time || numberOfGuests <= 0) {
    throw new Error("Invalid reservation details.")
  }
}

const validateItem = (name, price) => {
  if (!name || price <= 0) {
    throw new Error("Invalid menu item details.")
  }
}

const createNewReservation = (customerName, time, numberOfGuests, reservations) => {
  reservations.push({ customerName, time, numberOfGuests, status: "Pending" })
}

const getReservationBy = (customerName, reservations) => {
  const reservation = reservations.find((r) => r.customerName === customerName)

  if (!reservation) {
    throw new Error("Reservation not found.")
  }

  return reservation
}

const markAsConfirmed = reservation => {
  reservation.status = "Confirmed"
}

const checkConfirmedReservation = (reservationCustomerName, reservations) => {
  const reservation = reservations.find((r) => r.customerName === reservationCustomerName)

  if (!reservation || reservation.status !== "Confirmed") {
    throw new Error("Reservation must be confirmed before placing an order.")
  }
}

const calculateOrderTotal = (items, menu) => {
  return items.reduce((sum, item) => {
    if (!menu[item]) {
      throw new Error(`Menu item '${item}' not found.`)
    }
    return sum + menu[item]
  }, 0)
}

const getOrderByCustomerName = (reservationCustomerName, orders) => {
  const order = orders.find((o) => o.reservationCustomerName === reservationCustomerName)

  if (!order) {
    throw new Error("Order not found.")
  }

  return order
}

export default RestaurantSystem