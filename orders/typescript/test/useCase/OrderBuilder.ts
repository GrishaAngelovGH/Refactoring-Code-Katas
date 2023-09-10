import Order from '../../src/domain/Order'
import OrderItem from '../../src/domain/OrderItem'
import { OrderStatus } from '../../src/domain/OrderStatus'

class OrderBuilder {
  total = 0
  currency = 'EUR'
  items: OrderItem[] = []
  tax = 0
  id = 1

  buildCreatedOrder() {
    return new Order(
      this.total,
      this.currency,
      this.items,
      this.tax,
      OrderStatus.CREATED,
      this.id
    )
  }

  buildApprovedOrder() {
    return new Order(
      this.total,
      this.currency,
      this.items,
      this.tax,
      OrderStatus.APPROVED,
      this.id
    )
  }

  buildRejectedOrder() {
    return new Order(
      this.total,
      this.currency,
      this.items,
      this.tax,
      OrderStatus.REJECTED,
      this.id
    )
  }

  buildShippedOrder() {
    return new Order(
      this.total,
      this.currency,
      this.items,
      this.tax,
      OrderStatus.SHIPPED,
      this.id
    )
  }
}

export default OrderBuilder