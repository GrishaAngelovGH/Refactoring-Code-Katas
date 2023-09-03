import * as _ from 'lodash'
import { BundleDiscount } from './BundleDiscount'
import { Discount } from './Discount'
import { Product } from './Product'
import { ReceiptItem } from './ReceiptItem'

export class Receipt {
  private items: ReceiptItem[] = []
  private discounts: (Discount | BundleDiscount)[] = []

  public getTotalPrice(): number {
    let total = 0.0

    this.items.forEach(item => {
      total += item.totalPrice
    })

    this.discounts.forEach(discount => {
      total -= discount.discountAmount
    })

    return total
  }

  public addProduct(p: Product, quantity: number, price: number, totalPrice: number): void {
    this.items.push(new ReceiptItem(p, quantity, price, totalPrice))
  }

  public getItems(): ReceiptItem[] {
    return _.clone(this.items)
  }

  public addDiscount(discount: Discount | BundleDiscount): void {
    this.discounts.push(discount)
  }

  public getDiscounts(): Discount[] | BundleDiscount[] {
    return this.discounts
  }
}
