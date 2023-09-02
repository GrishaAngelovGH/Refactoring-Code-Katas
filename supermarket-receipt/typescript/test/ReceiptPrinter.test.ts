import { expect } from 'chai'
import { ReceiptPrinter } from '../src/ReceiptPrinter'
import { Discount } from '../src/model/Discount'

import { Product } from '../src/model/Product'
import { ProductUnit } from '../src/model/ProductUnit'
import { Receipt } from '../src/model/Receipt'

const providePredefinedReceipt = (): Receipt => {
  const receipt: Receipt = new Receipt()

  const toothbrush: Product = new Product('toothbrush', ProductUnit.Each)
  const oranges: Product = new Product('oranges', ProductUnit.Each)
  const apples: Product = new Product('apples', ProductUnit.Kilo)

  receipt.addProduct(toothbrush, 4, 1.99, 7.96)
  receipt.addProduct(oranges, 6, 1.20, 7.20)
  receipt.addProduct(apples, 5, 0.70, 3.50)
  receipt.addDiscount(new Discount(oranges, 'fresh fruits discount', 5.50))

  return receipt
}

describe('ReceiptPrinter', () => {
  it('should print receipt', () => {
    const receiptPrinter = new ReceiptPrinter()
    const receipt = providePredefinedReceipt()
    const actual = receiptPrinter.printReceipt(receipt)
    const expected = 'toothbrush                          7.96\n  1.99 * 4\noranges                             7.20\n  1.20 * 6\napples                              3.50\n  0.70 * 5.000\nfresh fruits discount(oranges)     -5.50\n\nTotal:                             13.16'
    expect(actual).to.equal(expected)
  })
})