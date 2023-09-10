import OrderItem from './OrderItem'
import { OrderStatus } from './OrderStatus'

class Order {
  total: number
  currency: string
  items: OrderItem[]
  tax: number
  status: OrderStatus
  id: number

  constructor(total: number, currency: string, items: OrderItem[], tax: number, status: OrderStatus, id: number) {
    this.total = total
    this.currency = currency
    this.items = items
    this.tax = tax
    this.status = status
    this.id = id
  }

  updateStatus(newStatus: OrderStatus) {
    this.status = newStatus
  }

  updateTotal(newTotal: number) {
    this.total = newTotal
  }

  updateTax(newTax: number) {
    this.tax = newTax
  }
}

export default Order

