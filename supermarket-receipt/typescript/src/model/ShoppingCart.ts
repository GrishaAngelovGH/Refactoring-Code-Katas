import * as _ from 'lodash'
import { Discount } from './Discount'
import { Offer } from './Offer'
import { Product } from './Product'
import { ProductQuantity } from './ProductQuantity'
import { Receipt } from './Receipt'
import { SpecialOfferType } from './SpecialOfferType'
import { SupermarketCatalog } from './SupermarketCatalog'

type ProductQuantities = { [productName: string]: ProductQuantity }
type SpecialOffers = { [productName: string]: number }
export type OffersByProduct = { [productName: string]: Offer }

export class ShoppingCart {

  private readonly items: ProductQuantity[] = []
  _productQuantities: ProductQuantities = {}
  _specialOffers: SpecialOffers = {
    [SpecialOfferType.ThreeForTwo]: 3,
    [SpecialOfferType.TwoForAmount]: 2,
    [SpecialOfferType.FiveForAmount]: 5
  }

  getItems(): ProductQuantity[] {
    return _.clone(this.items)
  }

  addItem(product: Product): void {
    this.addItemQuantity(product, 1.0)
  }

  productQuantities(): ProductQuantities {
    return this._productQuantities
  }

  applyDiscount(offer: Offer, quantity: number, unitPrice: number, product: Product): (Discount | null) {
    const specialOfferCoefficient = this._specialOffers[offer.offerType] ? this._specialOffers[offer.offerType] : 1

    const numberOfXs = Math.floor(quantity / specialOfferCoefficient)

    if (offer.offerType == SpecialOfferType.TenPercentDiscount) {
      return new Discount(product, offer.argument + '% off', quantity * unitPrice * offer.argument / 100.0)
    }

    if (offer.offerType == SpecialOfferType.FiveForAmount && quantity >= 5) {
      const discountTotal = unitPrice * quantity - (offer.argument * numberOfXs + quantity % 5 * unitPrice)
      return new Discount(product, specialOfferCoefficient + ' for ' + offer.argument, discountTotal)
    }

    if (offer.offerType == SpecialOfferType.ThreeForTwo && quantity > 2) {
      const discountAmount = quantity * unitPrice - ((numberOfXs * 2 * unitPrice) + quantity % 3 * unitPrice)
      return new Discount(product, '3 for 2', discountAmount)
    }

    if (quantity >= 2) {
      const total = offer.argument * Math.floor(quantity / specialOfferCoefficient) + quantity % 2 * unitPrice
      const discountN = unitPrice * quantity - total
      return new Discount(product, '2 for ' + offer.argument, discountN)
    }

    return null
  }

  public addItemQuantity(product: Product, quantity: number): void {
    const productQuantity = new ProductQuantity(product, quantity)
    this.items.push(productQuantity)

    const currentQuantity = this._productQuantities[product.name]
    this._productQuantities[product.name] = currentQuantity ? this.increaseQuantity(product, currentQuantity, quantity) : productQuantity
  }

  private increaseQuantity(product: Product, productQuantity: ProductQuantity, quantity: number) {
    return new ProductQuantity(product, productQuantity.quantity + quantity)
  }

  handleOffers(receipt: Receipt, offers: OffersByProduct, catalog: SupermarketCatalog): void {
    for (const productName in this.productQuantities()) {
      const productQuantity = this._productQuantities[productName]
      const product = productQuantity.product
      const quantity: number = this._productQuantities[productName].quantity

      if (offers[productName]) {
        const offer: Offer = offers[productName]
        const unitPrice: number = catalog.getUnitPrice(product)
        const discount: Discount | null = this.applyDiscount(offer, quantity, unitPrice, product)

        if (discount != null)
          receipt.addDiscount(discount)
      }
    }
  }
}
