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
    const initialOrder: Order = new OrderBuilder().buildApprovedOrder()
    orderRepository.addOrder(initialOrder)

    const request: OrderShipmentRequest = new OrderShipmentRequest(1)

    useCase.run(request)

    expect(orderRepository.getSavedOrder().status).toBe(OrderStatus.SHIPPED)
    expect(shipmentService.getShippedOrder()).toBe(initialOrder)
  })

  it('createdOrdersCannotBeShipped', () => {
    const initialOrder: Order = new OrderBuilder().buildCreatedOrder()
    orderRepository.addOrder(initialOrder)

    const request: OrderShipmentRequest = new OrderShipmentRequest(1)

    expect(() => useCase.run(request)).toThrow(OrderCannotBeShippedException)
    expect(orderRepository.getSavedOrder()).toBe(null)
    expect(shipmentService.getShippedOrder()).toBe(null)
  })

  it('rejectedOrdersCannotBeShipped', () => {
    const initialOrder: Order = new OrderBuilder().buildRejectedOrder()
    orderRepository.addOrder(initialOrder)

    const request: OrderShipmentRequest = new OrderShipmentRequest(1)

    expect(() => useCase.run(request)).toThrow(OrderCannotBeShippedException)
    expect(orderRepository.getSavedOrder()).toBe(null)
    expect(shipmentService.getShippedOrder()).toBe(null)
  })

  it('shippedOrdersCannotBeShippedAgain', () => {
    const initialOrder: Order = new OrderBuilder().buildShippedOrder()
    orderRepository.addOrder(initialOrder)

    const request: OrderShipmentRequest = new OrderShipmentRequest(1)

    expect(() => useCase.run(request)).toThrow(OrderCannotBeShippedTwiceException)
    expect(orderRepository.getSavedOrder()).toBe(null)
    expect(shipmentService.getShippedOrder()).toBe(null)
  })
})
