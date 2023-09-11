class OrderApprovalRequest {
  orderId: number
  isApproved: boolean

  constructor(orderId: number, isApproved: boolean) {
    this.orderId = orderId
    this.isApproved = isApproved
  }
}

export default OrderApprovalRequest

