import { Offer } from './Offer'
import { Product } from './Product'
import { Receipt } from './Receipt'
import { OffersByProduct, ShoppingCart } from './ShoppingCart'
import { SpecialOfferType } from './SpecialOfferType'
import { SupermarketCatalog } from './SupermarketCatalog'

export class Teller {
  private offers: OffersByProduct = {}

  public constructor(private readonly catalog: SupermarketCatalog) { }

  public addSpecialOffer(offerType: SpecialOfferType, product: Product, argument: number): void {
    this.offers[product.name] = new Offer(offerType, product, argument)
  }

  public checksOutArticlesFrom(theCart: ShoppingCart): Receipt {
    const receipt = new Receipt()
    const productQuantities = theCart.getItems()
    for (let pq of productQuantities) {
      let p = pq.product
      let quantity = pq.quantity
      let unitPrice = this.catalog.getUnitPrice(p)
      let price = quantity * unitPrice
      receipt.addProduct(p, quantity, unitPrice, price)
    }
    theCart.handleOffers(receipt, this.offers, this.catalog)

    return receipt
  }
}
