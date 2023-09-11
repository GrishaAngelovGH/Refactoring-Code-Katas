import Order from '../domain/Order'
import { OrderStatus } from '../domain/OrderStatus'
import OrderRepository from '../repository/OrderRepository'
import ApprovedOrderCannotBeRejectedException from './ApprovedOrderCannotBeRejectedException'
import OrderApprovalRequest from './OrderApprovalRequest'
import RejectedOrderCannotBeApprovedException from './RejectedOrderCannotBeApprovedException'
import ShippedOrdersCannotBeChangedException from './ShippedOrdersCannotBeChangedException'

const statuses: { [key in OrderStatus]: () => void } = {
  [OrderStatus.SHIPPED]: () => {
    throw new ShippedOrdersCannotBeChangedException()
  },
  [OrderStatus.REJECTED]: () => {
    throw new RejectedOrderCannotBeApprovedException()
  },
  [OrderStatus.APPROVED]: () => {
    throw new ApprovedOrderCannotBeRejectedException()
  },
  [OrderStatus.CREATED]: () => { }
}

class OrderApprovalUseCase {
  private readonly orderRepository: OrderRepository

  public constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository
  }

  public run(request: OrderApprovalRequest): void {
    const order: Order = this.orderRepository.getById(request.orderId)
    statuses[order.status]()
    order.updateStatus(request.isApproved ? OrderStatus.APPROVED : OrderStatus.REJECTED)
    this.orderRepository.save(order)
  }
}

export default OrderApprovalUseCase
