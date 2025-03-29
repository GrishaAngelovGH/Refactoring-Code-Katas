class ShoppingCart {
  constructor(inventory) {
    this.items = []
    this.inventory = inventory
    this.taxRate = 0.1 // 10% tax
  }

  addItem(name, price, quantity) {
    validateItem(name, price, quantity)

    checkInventoryAvailability(name, quantity, this.inventory)

    updateProductQuantityInInventory(name, quantity, this.inventory, true)

    addItemToCart(name, price, quantity, this.items)
  }

  removeItem(name) {
    const item = getItemBy({ name }, this.items)

    updateProductQuantityInInventory(name, item.quantity, this.inventory, false)

    this.items = removeFromCart(name, this.items)
  }

  applyPromotion(promotionCode) {
    const discountRate = applyPromotionCode(promotionCode)

    this.items = applyDiscount(discountRate, this.items)
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

const validateItem = (name, price, quantity) => {
  if (!name || price <= 0 || quantity <= 0) {
    throw new Error("Invalid item details.")
  }
}

const checkInventoryAvailability = (name, quantity, inventory) => {
  if (!inventory[name] || inventory[name] < quantity) {
    throw new Error("Insufficient stock.")
  }
}

const updateProductQuantityInInventory = (name, quantity, inventory, isDecrement) => {
  isDecrement ?
    inventory[name] -= quantity :
    inventory[name] += quantity
}

const addItemToCart = (name, price, quantity, items) => {
  items.push({ name, price, quantity, subtotal: price * quantity })
}

const getItemBy = (criteria, items) => {
  const [key, value] = Object.entries(criteria)[0]

  const item = items.find((item) => item[key] === value)

  if (!item) {
    throw new Error("Item not found in cart.")
  }

  return item
}

const removeFromCart = (name, items) => {
  return items.filter((item) => item.name !== name)
}

const applyPromotionCode = promotionCode => {
  const promotions = {
    "SPRING": 0.5, // 50% off
    "SUMMER": 0.2 // 20% off
  }

  const discountRate = promotions[promotionCode]

  if (!discountRate) {
    throw new Error("Invalid promotion code.")
  }

  return discountRate
}

const applyDiscount = (discountRate, items) => {
  return items.map((item) => {
    item.price = item.price * (1 - discountRate)
    item.subtotal = item.price * item.quantity
    return item
  })
}

export default ShoppingCart