import Category from './Category'

class Product {
  name: string
  price: number
  category: Category

  constructor(name: string, price: number, category: Category) {
    this.name = name
    this.price = price
    this.category = category
  }

  calculateUnitaryTax() {
    return Math.round(this.price / 100 * this.category.taxPercentage * 100) / 100
  }

  calculateUnitaryTaxedAmount() {
    return Math.round((this.price + this.calculateUnitaryTax()) * 100) / 100
  }

  calculateTaxedAmount(sellItemQuantity: number) {
    return Math.round(this.calculateUnitaryTaxedAmount() * sellItemQuantity * 100) / 100
  }
}

export default Product

