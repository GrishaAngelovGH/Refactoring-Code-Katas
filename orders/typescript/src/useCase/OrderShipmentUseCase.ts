import Order from '../domain/Order'
import { OrderStatus } from '../domain/OrderStatus'
import OrderRepository from '../repository/OrderRepository'
import { ShipmentService } from '../service/ShipmentService'
import OrderCannotBeShippedException from './OrderCannotBeShippedException'
import OrderCannotBeShippedTwiceException from './OrderCannotBeShippedTwiceException'
import OrderShipmentRequest from './OrderShipmentRequest'

const statuses: { [key in OrderStatus]: () => void } = {
  [OrderStatus.CREATED]: () => {
    throw new OrderCannotBeShippedException()
  },
  [OrderStatus.REJECTED]: () => {
    throw new OrderCannotBeShippedException()
  },
  [OrderStatus.SHIPPED]: () => {
    throw new OrderCannotBeShippedTwiceException()
  },
  [OrderStatus.APPROVED]: () => { }
}

class OrderShipmentUseCase {
  private readonly orderRepository: OrderRepository
  private readonly shipmentService: ShipmentService

  public constructor(orderRepository: OrderRepository, shipmentService: ShipmentService) {
    this.orderRepository = orderRepository
    this.shipmentService = shipmentService
  }

  public run(request: OrderShipmentRequest): void {
    const order: Order = this.orderRepository.getById(request.orderId)

    statuses[order.status]()

    this.shipmentService.ship(order)

    order.updateStatus(OrderStatus.SHIPPED)
    this.orderRepository.save(order)
  }
}

export default OrderShipmentUseCase
