import { expect } from "chai"
import ShoppingCart from "./shopping-cart-kata.js"

describe("ShoppingCart", () => {
  let cart
  let inventory

  beforeEach(() => {
    inventory = {
      Laptop: 10,
      Mouse: 50,
      Keyboard: 30
    }
    cart = new ShoppingCart(inventory)
  })

  it("should add items successfully and reduce stock", () => {
    cart.addItem("Laptop", 1000, 1)
    const items = cart.listItems()
    expect(items.length).to.equal(1)
    expect(items[0]).to.equal("1 x Laptop: $1000.00 (Subtotal: $1000.00)")
    expect(cart.getInventory()["Laptop"]).to.equal(9)
  })

  it("should throw an error for insufficient stock", () => {
    expect(() => cart.addItem("Laptop", 1000, 11)).to.throw(/Insufficient stock/)
  })

  it("should remove items successfully and return stock", () => {
    cart.addItem("Laptop", 1000, 1)
    cart.removeItem("Laptop")
    const items = cart.listItems()
    expect(items.length).to.equal(0)
    expect(cart.getInventory()["Laptop"]).to.equal(10)
  })

  it("should apply SPRING promotion correctly", () => {
    cart.addItem("Laptop", 1000, 1)
    cart.applyPromotion("SPRING")
    const items = cart.listItems()
    expect(items[0]).to.equal("1 x Laptop: $500.00 (Subtotal: $500.00)")
  })

  it("should calculate total with tax correctly", () => {
    cart.addItem("Laptop", 1000, 2)
    const totals = cart.calculateTotal()
    expect(totals.totalBeforeTax).to.equal(2000)
    expect(totals.tax).to.equal(200) // 10% tax
    expect(totals.totalAfterTax).to.equal(2200)
  })

  it("should adjust prices dynamically based on demand rate", () => {
    cart.addItem("Laptop", 1000, 1)
    cart.calculateDynamicPricing(1.5) // Increase prices by 50%
    const items = cart.listItems()
    expect(items[0]).to.equal("1 x Laptop: $1500.00 (Subtotal: $1500.00)")
  })
})