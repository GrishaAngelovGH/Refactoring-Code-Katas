class OrderFulfillmentSystem {
  constructor() {
    this.orders = []
    this.inventory = {}
  }

  addInventory(itemName, quantity, pricePerUnit) {
    if (!itemName || quantity <= 0 || pricePerUnit <= 0) {
      throw new Error("Invalid inventory details.")
    }
    if (!this.inventory[itemName]) {
      this.inventory[itemName] = { quantity: 0, pricePerUnit }
    }
    this.inventory[itemName].quantity += quantity
  }

  createOrder(orderId, customerName, items) {
    if (!orderId || !customerName || !Array.isArray(items) || items.length === 0) {
      throw new Error("Invalid order details.")
    }
    items.forEach((item) => {
      const inventoryItem = this.inventory[item.name]
      if (!inventoryItem || inventoryItem.quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${item.name}.`)
      }
    })
    this.orders.push({
      orderId,
      customerName,
      items,
      status: "Created",
      shippingCost: null,
      trackingId: null
    })
    items.forEach((item) => {
      this.inventory[item.name].quantity -= item.quantity
    })
  }

  calculateShipping(orderId, destination) {
    const order = this.orders.find((order) => order.orderId === orderId)
    if (!order) {
      throw new Error("Order not found.")
    }
    const baseCost = 50
    const weightMultiplier = order.items.reduce((acc, item) => acc + item.quantity, 0)
    const destinationMultiplier = destination === "International" ? 2 : 1
    order.shippingCost = baseCost * weightMultiplier * destinationMultiplier
  }

  generateTracking(orderId) {
    const order = this.orders.find((order) => order.orderId === orderId)
    if (!order || order.status !== "Created") {
      throw new Error("Order must be in 'Created' status to generate tracking.")
    }
    order.trackingId = `TRACK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    order.status = "Shipped"
  }

  updateOrderStatus(orderId, status) {
    const order = this.orders.find((order) => order.orderId === orderId)
    if (!order) {
      throw new Error("Order not found.")
    }
    const validStatuses = ["Created", "Shipped", "Delivered", "Cancelled"]
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status.")
    }
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
    return Object.entries(this.inventory).map(([name, details]) => ({
      itemName: name,
      quantity: details.quantity,
      pricePerUnit: details.pricePerUnit
    }))
  }
}

export default OrderFulfillmentSystem