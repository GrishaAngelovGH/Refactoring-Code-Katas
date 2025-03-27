class OrderFulfillmentSystem {
  constructor() {
    this.orders = []
    this.inventory = {}
  }

  addToInventory(itemName, quantity, pricePerUnit) {
    validateItem(itemName, quantity, pricePerUnit)

    if (!this.inventory[itemName]) {
      this.inventory[itemName] = { quantity: 0, pricePerUnit }
    }

    updateQuantity(itemName, quantity, this.inventory, true)
  }

  createOrder(orderId, customerName, items) {
    validateOrder(orderId, customerName, items)

    checkAvailability(items, this.inventory)

    addNewOrder(orderId, customerName, items, this.orders)

    items.forEach((item) => {
      updateQuantity(item.name, item.quantity, this.inventory, false)
    })
  }

  calculateShipping(orderId, destination) {
    const order = this.getOrderDetails(orderId)

    calculateShippingCost(order, destination)
  }

  generateTracking(orderId) {
    const order = getCreatedOrderById(orderId, this.orders)

    markAsShipped(order)
  }

  updateOrderStatus(orderId, status) {
    const order = this.getOrderDetails(orderId)

    validateOrderStatus(status)

    order.status = status
  }

  getOrderDetails(orderId) {
    const order = this.orders.find((order) => order.orderId === orderId)

    if (!order) {
      throw new Error("Order not found.")
    }

    return order
  }

  generateInventoryReport() {
    return Object.entries(this.inventory).map(([itemName, { quantity, pricePerUnit }]) => ({
      itemName,
      quantity,
      pricePerUnit
    }))
  }
}

const validateItem = (itemName, quantity, pricePerUnit) => {
  if (!itemName || quantity <= 0 || pricePerUnit <= 0) {
    throw new Error("Invalid inventory details.")
  }
}

const validateOrder = (orderId, customerName, items) => {
  if (!orderId || !customerName || !Array.isArray(items) || items.length === 0) {
    throw new Error("Invalid order details.")
  }
}

const checkAvailability = (items, inventory) => {
  items.forEach((item) => {
    const inventoryItem = inventory[item.name]
    if (!inventoryItem || inventoryItem.quantity < item.quantity) {
      throw new Error(`Insufficient stock for ${item.name}.`)
    }
  })
}

const addNewOrder = (orderId, customerName, items, orders) => {
  orders.push({
    orderId,
    customerName,
    items,
    status: "Created",
    shippingCost: null,
    trackingId: null
  })
}

const updateQuantity = (itemName, quantity, inventory, isAddition) => {
  isAddition ?
    inventory[itemName].quantity += quantity :
    inventory[itemName].quantity -= quantity
}

const multipliers = {
  getWeight: order => order.items.reduce((acc, item) => acc + item.quantity, 0),
  getDestination: destination => destination === "International" ? 2 : 1
}

const calculateShippingCost = (order, destination) => {
  const baseCost = 50
  const weightMultiplier = multipliers.getWeight(order)
  const destinationMultiplier = multipliers.getDestination(destination)
  order.shippingCost = baseCost * weightMultiplier * destinationMultiplier
}

const getCreatedOrderById = (orderId, orders) => {
  const order = orders.find((order) => order.orderId === orderId)

  if (!order || order.status !== "Created") {
    throw new Error("Order must be in 'Created' status to generate tracking.")
  }

  return order
}

const markAsShipped = order => {
  order.trackingId = `TRACK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
  order.status = "Shipped"
}

const validateOrderStatus = status => {
  if (!["Created", "Shipped", "Delivered", "Cancelled"].includes(status)) {
    throw new Error("Invalid status.")
  }
}

export default OrderFulfillmentSystem