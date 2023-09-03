import { Product } from './Product'
import { ProductQuantity } from './ProductQuantity'
import { SpecialOfferType } from './SpecialOfferType'

export class BundleOffer {
  public constructor(
    public readonly offerType: SpecialOfferType,
    public readonly products: Product[],
    public readonly productQuantities: ProductQuantity[],
    public readonly argument: number
  ) { }

  getProducts(): Product[] {
    return this.products
  }

  getProductQuantities(): ProductQuantity[] {
    return this.productQuantities
  }
}
