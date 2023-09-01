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

  public checksOutArticlesFrom(cart: ShoppingCart): Receipt {
    const receipt = new Receipt()
    const productQuantities = cart.getItems()

    productQuantities.forEach(pq => {
      const unitPrice = this.catalog.getUnitPrice(pq.product)
      const price = pq.quantity * unitPrice

      receipt.addProduct(pq.product, pq.quantity, unitPrice, price)
    })

    cart.handleOffers(receipt, this.offers, this.catalog)

    return receipt
  }
}
