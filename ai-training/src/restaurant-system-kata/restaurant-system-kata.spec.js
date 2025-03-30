import { expect } from "chai"
import RestaurantSystem from "./restaurant-system-kata.js"

describe("RestaurantSystem", () => {
  let system

  beforeEach(() => {
    system = new RestaurantSystem()
    system.addMenuItem("Pasta", 12)
    system.addMenuItem("Pizza", 15)
    system.addMenuItem("Salad", 8)
  })

  it("should add menu items successfully", () => {
    system.addMenuItem("Burger", 10)
    const report = system.generateReport()
    const menuItem = report.menu.find((item) => item.itemName === "Burger")
    expect(menuItem.price).to.equal(10)
  })

  it("should make reservations successfully", () => {
    system.makeReservation("John Doe", "18:00", 4)
    const report = system.generateReport()
    const reservation = report.reservations.find((r) => r.customerName === "John Doe")
    expect(reservation.status).to.equal("Pending")
  })

  it("should confirm reservations", () => {
    system.makeReservation("John Doe", "18:00", 4)
    system.confirmReservation("John Doe")
    const report = system.generateReport()
    const reservation = report.reservations.find((r) => r.customerName === "John Doe")
    expect(reservation.status).to.equal("Confirmed")
  })

  it("should cancel reservations", () => {
    system.makeReservation("John Doe", "18:00", 4)
    system.cancelReservation("John Doe")
    const report = system.generateReport()
    const reservation = report.reservations.find((r) => r.customerName === "John Doe")
    expect(reservation).to.be.undefined
  })

  it("should place orders successfully", () => {
    system.makeReservation("John Doe", "18:00", 4)
    system.confirmReservation("John Doe")
    const total = system.placeOrder("John Doe", ["Pasta", "Pizza", "Salad"])
    expect(total).to.equal(35)
  })

  it("should throw error when placing order for unconfirmed reservation", () => {
    system.makeReservation("John Doe", "18:00", 4)
    expect(() => system.placeOrder("John Doe", ["Pasta"])).to.throw(/Reservation must be confirmed/)
  })

  it("should generate bills correctly", () => {
    system.makeReservation("John Doe", "18:00", 4)
    system.confirmReservation("John Doe")
    system.placeOrder("John Doe", ["Pasta", "Pizza"])
    const bill = system.generateBill("John Doe")
    expect(bill.customerName).to.equal("John Doe")
    expect(bill.total).to.equal(27)
  })

  it("should generate a full system report", () => {
    system.makeReservation("John Doe", "18:00", 4)
    system.confirmReservation("John Doe")
    system.placeOrder("John Doe", ["Pasta", "Pizza"])
    const report = system.generateReport()
    expect(report.reservations.length).to.equal(1)
    expect(report.menu.length).to.equal(3) // Pasta, Pizza, Salad
    expect(report.orders.length).to.equal(1)
  })
})