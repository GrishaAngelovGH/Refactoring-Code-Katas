import { Product } from './Product'

export class BundleDiscount {
  constructor(
    public readonly product: Product,
    public readonly description: string,
    public readonly discountAmount: number,
  ) { }
}
