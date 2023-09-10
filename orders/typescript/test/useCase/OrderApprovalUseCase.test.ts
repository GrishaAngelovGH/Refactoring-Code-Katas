import Order from '../../src/domain/Order'
import { OrderStatus } from '../../src/domain/OrderStatus'
import ApprovedOrderCannotBeRejectedException from '../../src/useCase/ApprovedOrderCannotBeRejectedException'
import OrderApprovalRequest from '../../src/useCase/OrderApprovalRequest'
import OrderApprovalUseCase from '../../src/useCase/OrderApprovalUseCase'
import RejectedOrderCannotBeApprovedException from '../../src/useCase/RejectedOrderCannotBeApprovedException'
import ShippedOrdersCannotBeChangedException from '../../src/useCase/ShippedOrdersCannotBeChangedException'
import TestOrderRepository from '../doubles/TestOrderRepository'

import OrderBuilder from './OrderBuilder'

describe('OrderApprovalUseCase', () => {
  let orderRepository: TestOrderRepository
  let useCase: OrderApprovalUseCase

  beforeEach(() => {
    orderRepository = new TestOrderRepository()
    useCase = new OrderApprovalUseCase(orderRepository)
  })

  it('approvedExistingOrder', () => {
    let initialOrder: Order = new OrderBuilder().buildCreatedOrder()
    orderRepository.addOrder(initialOrder)

    let request: OrderApprovalRequest = new OrderApprovalRequest()
    request.setOrderId(1)
    request.setApproved(true)

    useCase.run(request)

    const savedOrder: Order = orderRepository.getSavedOrder()
    expect(savedOrder.status).toBe(OrderStatus.APPROVED)
  })

  it('rejectedExistingOrder', () => {
    let initialOrder: Order = new OrderBuilder().buildCreatedOrder()
    orderRepository.addOrder(initialOrder)

    let request: OrderApprovalRequest = new OrderApprovalRequest()
    request.setOrderId(1)
    request.setApproved(false)

    useCase.run(request)

    const savedOrder: Order = orderRepository.getSavedOrder()
    expect(savedOrder.status).toBe(OrderStatus.REJECTED)
  })

  it('cannotApproveRejectedOrder', () => {
    const initialOrder: Order = new OrderBuilder().buildRejectedOrder()
    orderRepository.addOrder(initialOrder)

    const request: OrderApprovalRequest = new OrderApprovalRequest()
    request.setOrderId(1)
    request.setApproved(true)

    expect(() => useCase.run(request)).toThrow(RejectedOrderCannotBeApprovedException)
    expect(orderRepository.getSavedOrder()).toBe(null)
  })

  it('cannotRejectApprovedOrder', () => {
    const initialOrder: Order = new OrderBuilder().buildApprovedOrder()
    orderRepository.addOrder(initialOrder)

    const request: OrderApprovalRequest = new OrderApprovalRequest()
    request.setOrderId(1)
    request.setApproved(false)

    expect(() => useCase.run(request)).toThrow(ApprovedOrderCannotBeRejectedException)
    expect(orderRepository.getSavedOrder()).toBe(null)
  })

  it('shippedOrdersCannotBeApproved', () => {
    const initialOrder: Order = new OrderBuilder().buildShippedOrder()
    orderRepository.addOrder(initialOrder)

    const request: OrderApprovalRequest = new OrderApprovalRequest()
    request.setOrderId(1)
    request.setApproved(true)

    expect(() => useCase.run(request)).toThrow(ShippedOrdersCannotBeChangedException)
    expect(orderRepository.getSavedOrder()).toBe(null)
  })

  it('shippedOrdersCannotBeRejected', () => {
    let initialOrder: Order = new OrderBuilder().buildShippedOrder()
    orderRepository.addOrder(initialOrder)

    let request: OrderApprovalRequest = new OrderApprovalRequest()
    request.setOrderId(1)
    request.setApproved(false)

    expect(() => useCase.run(request)).toThrow(ShippedOrdersCannotBeChangedException)
    expect(orderRepository.getSavedOrder()).toBe(null)
  })
})
