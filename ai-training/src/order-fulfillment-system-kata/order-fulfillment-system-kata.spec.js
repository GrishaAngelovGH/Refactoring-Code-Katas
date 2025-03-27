import { expect } from "chai"
import OrderFulfillmentSystem from "./order-fulfillment-system-kata.js"

describe("OrderFulfillmentSystem", () => {
  let system

  beforeEach(() => {
    system = new OrderFulfillmentSystem()
    system.addToInventory("Laptop", 10, 1000)
    system.addToInventory("Mouse", 50, 20)
  })

  it("should add inventory successfully", () => {
    system.addToInventory("Keyboard", 20, 50)
    const report = system.generateInventoryReport()
    const keyboard = report.find((item) => item.itemName === "Keyboard")
    expect(keyboard.quantity).to.equal(20)
    expect(keyboard.pricePerUnit).to.equal(50)
  })

  it("should create an order successfully", () => {
    system.createOrder(1, "John Doe", [{ name: "Laptop", quantity: 2 }, { name: "Mouse", quantity: 5 }])
    const order = system.getOrderDetails(1)
    expect(order.customerName).to.equal("John Doe")
    expect(order.items.length).to.equal(2)
    expect(order.status).to.equal("Created")
  })

  it("should throw an error for insufficient stock", () => {
    expect(() => system.createOrder(1, "Jane Doe", [{ name: "Laptop", quantity: 15 }])).to.throw(/Insufficient stock/)
  })

  it("should calculate shipping cost correctly", () => {
    system.createOrder(1, "John Doe", [{ name: "Laptop", quantity: 2 }, { name: "Mouse", quantity: 5 }])
    system.calculateShipping(1, "Domestic")
    const order = system.getOrderDetails(1)
    expect(order.shippingCost).to.equal(350) // Base cost (50) * weight (7) * multiplier (1)
  })

  it("should generate tracking ID and mark order as shipped", () => {
    system.createOrder(1, "John Doe", [{ name: "Laptop", quantity: 2 }])
    system.generateTracking(1)
    const order = system.getOrderDetails(1)
    expect(order.status).to.equal("Shipped")
    expect(order.trackingId).to.satisfy((trackingId) => trackingId.startsWith("TRACK-"))
  })

  it("should update order status correctly", () => {
    system.createOrder(1, "John Doe", [{ name: "Laptop", quantity: 2 }])
    system.updateOrderStatus(1, "Delivered")
    const order = system.getOrderDetails(1)
    expect(order.status).to.equal("Delivered")
  })

  it("should generate inventory report correctly", () => {
    const report = system.generateInventoryReport()
    expect(report.length).to.equal(2) // Laptop and Mouse
  })
})