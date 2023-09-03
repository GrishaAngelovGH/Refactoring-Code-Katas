import { ProductUnit } from './model/ProductUnit'
import { ReceiptItem } from './model/ReceiptItem'
import { Receipt } from './model/Receipt'

export class ReceiptPrinter {
  public constructor(private readonly columns: number = 40) { }

  public printReceipt(receipt: Receipt): string {
    let result = ''

    for (const item of receipt.getItems()) {
      const price = this.format2Decimals(item.totalPrice)
      const quantity = this.presentQuantity(item)
      const unitPrice = this.format2Decimals(item.price)
      const whitespaceSize = this.columns - item.product.name.length - price.length
      let line = `${item.product.name}${this.getWhitespace(whitespaceSize)}${price}\n`

      if (item.quantity != 1) {
        line += `  ${unitPrice} * ${quantity}\n`
      }

      result += line
    }

    for (const discount of receipt.getDiscounts()) {
      const productPresentation = discount.product.name
      const pricePresentation = this.format2Decimals(discount.discountAmount)
      const description = discount.description

      result += `${description}(${productPresentation})${this.getWhitespace(this.columns - 3 - productPresentation.length - description.length - pricePresentation.length)}-${pricePresentation}\n`
    }

    result += '\n'

    const pricePresentation = this.format2Decimals(receipt.getTotalPrice())
    const total = 'Total: '
    const whitespace = this.getWhitespace(this.columns - total.length - pricePresentation.length)

    result += `${total}${whitespace}${pricePresentation}`

    return result
  }

  private format2Decimals(number: number) {
    return new Intl.NumberFormat('en-UK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(number)
  }

  private presentQuantity(item: ReceiptItem): string {
    return ProductUnit.Each == item.product.unit
      ? new Intl.NumberFormat('en-UK', { maximumFractionDigits: 0 }).format(item.quantity)
      : new Intl.NumberFormat('en-UK', { minimumFractionDigits: 3 }).format(item.quantity)
  }

  private getWhitespace(whitespaceSize: number): string {
    return ' '.repeat(whitespaceSize)
  }
}
