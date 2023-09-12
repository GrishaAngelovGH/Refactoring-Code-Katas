class SellItemRequest {
  productName: string
  quantity: number

  constructor(productName: string, quantity: number) {
    this.productName = productName
    this.quantity = quantity
  }
}

export default SellItemRequest
