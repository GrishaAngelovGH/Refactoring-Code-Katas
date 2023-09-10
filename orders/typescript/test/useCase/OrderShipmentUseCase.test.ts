import Order from '../../src/domain/Order'
import { OrderStatus } from '../../src/domain/OrderStatus'
import OrderCannotBeShippedException from '../../src/useCase/OrderCannotBeShippedException'
import OrderCannotBeShippedTwiceException from '../../src/useCase/OrderCannotBeShippedTwiceException'
import OrderShipmentRequest from '../../src/useCase/OrderShipmentRequest'
import OrderShipmentUseCase from '../../src/useCase/OrderShipmentUseCase'
import TestOrderRepository from '../doubles/TestOrderRepository'
import TestShipmentService from '../doubles/TestShipmentService'
import OrderBuilder from './OrderBuilder'

describe('OrderShipmentUseCase', () => {
  let orderRepository: TestOrderRepository
  let shipmentService: TestShipmentService
  let useCase: OrderShipmentUseCase

  beforeEach(() => {
    orderRepository = new TestOrderRepository()
    shipmentService = new TestShipmentService()
    useCase = new OrderShipmentUseCase(orderRepository, shipmentService)
  })

  it('shipApprovedOrder', () => {
    let initialOrder: Order = new OrderBuilder().buildApprovedOrder()
    orderRepository.addOrder(initialOrder)

    let request: OrderShipmentRequest = new OrderShipmentRequest()
    request.setOrderId(1)

    useCase.run(request)

    expect(orderRepository.getSavedOrder().status).toBe(OrderStatus.SHIPPED)
    expect(shipmentService.getShippedOrder()).toBe(initialOrder)
  })

  it('createdOrdersCannotBeShipped', () => {
    let initialOrder: Order = new OrderBuilder().buildCreatedOrder()
    orderRepository.addOrder(initialOrder)

    let request: OrderShipmentRequest = new OrderShipmentRequest()
    request.setOrderId(1)

    expect(() => useCase.run(request)).toThrow(OrderCannotBeShippedException)
    expect(orderRepository.getSavedOrder()).toBe(null)
    expect(shipmentService.getShippedOrder()).toBe(null)
  })

  it('rejectedOrdersCannotBeShipped', () => {
    let initialOrder: Order = new OrderBuilder().buildRejectedOrder()
    orderRepository.addOrder(initialOrder)

    let request: OrderShipmentRequest = new OrderShipmentRequest()
    request.setOrderId(1)

    expect(() => useCase.run(request)).toThrow(OrderCannotBeShippedException)
    expect(orderRepository.getSavedOrder()).toBe(null)
    expect(shipmentService.getShippedOrder()).toBe(null)
  })

  it('shippedOrdersCannotBeShippedAgain', () => {
    let initialOrder: Order = new OrderBuilder().buildShippedOrder()
    orderRepository.addOrder(initialOrder)

    let request: OrderShipmentRequest = new OrderShipmentRequest()
    request.setOrderId(1)

    expect(() => useCase.run(request)).toThrow(OrderCannotBeShippedTwiceException)
    expect(orderRepository.getSavedOrder()).toBe(null)
    expect(shipmentService.getShippedOrder()).toBe(null)
  })
})
