class ShoppingCart {
  constructor() {
    this.productPrices = []
  }

  add = productPrice => {
    this.productPrices.push(productPrice)
  }

  calculateTotalPrice = () => this.productPrices.reduce((a, b) => a + b)

  numberOfProducts = () => this.productPrices.length

  hasDiscount = () => this.calculateTotalPrice() > 100
}

export default ShoppingCart
