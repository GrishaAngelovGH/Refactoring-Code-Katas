import * as _ from 'lodash'
import { BundleDiscount } from './BundleDiscount'
import { BundleOffer } from './BundleOffer'
import { Discount } from './Discount'
import { Offer } from './Offer'
import { Product } from './Product'
import { ProductQuantity } from './ProductQuantity'
import { ProductUnit } from './ProductUnit'
import { Receipt } from './Receipt'
import { SpecialOfferType } from './SpecialOfferType'
import { SupermarketCatalog } from './SupermarketCatalog'

type ProductQuantities = { [productName: string]: ProductQuantity }
type SpecialOffers = { [productName: string]: number }
export type OffersByProduct = { [productName: string]: Offer | BundleOffer }

export class ShoppingCart {

  private readonly items: ProductQuantity[] = []
  _productQuantities: ProductQuantities = {}
  _specialOffers: SpecialOffers = {
    [SpecialOfferType.ThreeForTwo]: 3,
    [SpecialOfferType.TwoForAmount]: 2,
    [SpecialOfferType.FiveForAmount]: 5,
    [SpecialOfferType.Bundle]: 6,
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

  applyDiscount(offer: Offer | BundleOffer, quantity: number, unitPrice: number, product: Product, catalog: SupermarketCatalog): (Discount | BundleDiscount | null) {
    const specialOfferCoefficient = this._specialOffers[offer.offerType] ? this._specialOffers[offer.offerType] : 1

    const numberOfXs = Math.floor(quantity / specialOfferCoefficient)

    if ((offer as BundleOffer).offerType === SpecialOfferType.Bundle) {
      const isBundle: Boolean = (offer as BundleOffer).getProductQuantities().every(v => v.quantity === 1)

      if (isBundle) {
        const total: number = (offer as BundleOffer)
          .getProducts()
          .map(v => catalog.getUnitPrice(v))
          .reduce((a: number, b: number) => a + b)

        return new BundleDiscount(new Product('Bundle', ProductUnit.Each), '10% off for bundle', 0.1 * total)
      }
    }

    if (offer.offerType == SpecialOfferType.TenPercentDiscount) {
      return new Discount(product, (offer as Offer).argument + '% off', quantity * unitPrice * (offer as Offer).argument / 100.0)
    }

    if (offer.offerType == SpecialOfferType.FiveForAmount && quantity >= 5) {
      const discountTotal = unitPrice * quantity - ((offer as Offer).argument * numberOfXs + quantity % 5 * unitPrice)
      return new Discount(product, specialOfferCoefficient + ' for ' + (offer as Offer).argument, discountTotal)
    }

    if (offer.offerType == SpecialOfferType.ThreeForTwo && quantity > 2) {
      const discountAmount = quantity * unitPrice - ((numberOfXs * 2 * unitPrice) + quantity % 3 * unitPrice)
      return new Discount(product, '3 for 2', discountAmount)
    }

    if (quantity >= 2) {
      const total = (offer as Offer).argument * Math.floor(quantity / specialOfferCoefficient) + quantity % 2 * unitPrice
      const discountN = unitPrice * quantity - total
      return new Discount(product, '2 for ' + (offer as Offer).argument, discountN)
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
    let shouldApplyDiscount = true

    for (const productName in this.productQuantities()) {
      const productQuantity = this._productQuantities[productName]
      const product = productQuantity.product
      const quantity: number = this._productQuantities[productName].quantity

      if (offers[productName] || offers['bundle']) {
        const offer: Offer | BundleOffer = offers[productName] || offers['bundle']
        const unitPrice: number = catalog.getUnitPrice(product)
        const discount: Discount | BundleDiscount | null = this.applyDiscount(offer, quantity, unitPrice, product, catalog)

        if (discount != null && shouldApplyDiscount)
          receipt.addDiscount(discount)

        shouldApplyDiscount = offers['bundle'] ? false : true
      }
    }
  }
}
