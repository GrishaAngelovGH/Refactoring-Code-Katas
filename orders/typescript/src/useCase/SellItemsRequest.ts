import SellItemRequest from './SellItemRequest'

class SellItemsRequest {
  sellItemRequests: SellItemRequest[]

  constructor(sellItemRequests: SellItemRequest[]) {
    this.sellItemRequests = sellItemRequests
  }
}

export default SellItemsRequest
