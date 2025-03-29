class ShoppingCart {
  constructor(inventory) {
    this.items = []
    this.inventory = inventory // An object mapping item names to available stock
    this.taxRate = 0.1 // 10% tax
  }

  addItem(name, price, quantity) {
    if (!name || price <= 0 || quantity <= 0) {
      throw new Error("Invalid item details.")
    }
    if (!this.inventory[name] || this.inventory[name] < quantity) {
      throw new Error("Insufficient stock.")
    }
    this.inventory[name] -= quantity
    this.items.push({ name, price, quantity, subtotal: price * quantity })
  }

  removeItem(name) {
    const item = this.items.find((item) => item.name === name)
    if (!item) {
      throw new Error("Item not found in cart.")
    }
    this.inventory[name] += item.quantity // Return stock to inventory
    this.items = this.items.filter((item) => item.name !== name)
  }

  applyPromotion(promotionCode) {
    const promotions = {
      "BLACKFRIDAY": 0.5, // 50% off
      "SUMMER21": 0.2 // 20% off
    }
    const discountRate = promotions[promotionCode]
    if (!discountRate) {
      throw new Error("Invalid promotion code.")
    }
    this.items = this.items.map((item) => {
      item.price = item.price * (1 - discountRate)
      item.subtotal = item.price * item.quantity
      return item
    })
  }

  calculateTotal() {
    const totalBeforeTax = this.items.reduce((acc, item) => acc + item.subtotal, 0)
    const tax = totalBeforeTax * this.taxRate
    return { totalBeforeTax, tax, totalAfterTax: totalBeforeTax + tax }
  }

  calculateDynamicPricing(demandRate) {
    this.items = this.items.map((item) => {
      item.price = item.price * demandRate // Adjust price based on demand
      item.subtotal = item.price * item.quantity
      return item
    })
  }

  listItems() {
    return this.items.map((item) => `${item.quantity} x ${item.name}: $${item.price.toFixed(2)} (Subtotal: $${item.subtotal.toFixed(2)})`)
  }

  getInventory() {
    return this.inventory
  }
}

export default ShoppingCart