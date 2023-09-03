import { Product } from '../src/model/Product'
import { ProductUnit } from '../src/model/ProductUnit'
import { Receipt } from '../src/model/Receipt'
import { ShoppingCart } from '../src/model/ShoppingCart'
import { SpecialOfferType } from '../src/model/SpecialOfferType'
import { SupermarketCatalog } from '../src/model/SupermarketCatalog'
import { Teller } from '../src/model/Teller'
import { FakeCatalog } from './FakeCatalog'

const approvals = require('approvals')

describe('Supermarket', function () {

  approvals.mocha()

  it('should generate receipt from shopping cart items', function (this: any) {
    const catalog: SupermarketCatalog = new FakeCatalog()
    const cart: ShoppingCart = new ShoppingCart()

    const toothbrush: Product = new Product('toothbrush', ProductUnit.Each)
    const apples: Product = new Product('apples', ProductUnit.Kilo)

    catalog.addProduct(toothbrush, 0.99)
    catalog.addProduct(apples, 1.99)

    cart.addItemQuantity(toothbrush, 4)
    cart.addItemQuantity(apples, 2.5)

    const teller: Teller = new Teller(catalog)

    const receipt: Receipt = teller.checksOutArticlesFrom(cart)

    this.verifyAsJSON({
      items: receipt.getItems(),
      discounts: receipt.getDiscounts()
    })
  })

  it('should generate receipt from shopping cart items with special offer 3 for 2', function (this: any) {
    const catalog: SupermarketCatalog = new FakeCatalog()
    const cart: ShoppingCart = new ShoppingCart()

    const toothbrush: Product = new Product('toothbrush', ProductUnit.Each)
    const apples: Product = new Product('apples', ProductUnit.Kilo)

    catalog.addProduct(toothbrush, 0.99)
    catalog.addProduct(apples, 1.99)

    cart.addItemQuantity(toothbrush, 4)
    cart.addItemQuantity(apples, 2.5)

    const teller: Teller = new Teller(catalog)
    teller.addSpecialOffer(SpecialOfferType.ThreeForTwo, toothbrush, 5)

    const receipt: Receipt = teller.checksOutArticlesFrom(cart)

    this.verifyAsJSON({
      items: receipt.getItems(),
      discounts: receipt.getDiscounts()
    })
  })

  it('should generate receipt from shopping cart items with special offer 2 for amount', function (this: any) {
    const catalog: SupermarketCatalog = new FakeCatalog()
    const cart: ShoppingCart = new ShoppingCart()

    const toothbrush: Product = new Product('toothbrush', ProductUnit.Each)
    const apples: Product = new Product('apples', ProductUnit.Kilo)

    catalog.addProduct(toothbrush, 0.99)
    catalog.addProduct(apples, 1.99)

    cart.addItemQuantity(toothbrush, 4)
    cart.addItemQuantity(apples, 2.5)

    const teller: Teller = new Teller(catalog)
    teller.addSpecialOffer(SpecialOfferType.TwoForAmount, toothbrush, 3)

    const receipt: Receipt = teller.checksOutArticlesFrom(cart)

    this.verifyAsJSON({
      items: receipt.getItems(),
      discounts: receipt.getDiscounts()
    })
  })

  it('should generate receipt from shopping cart items with special offer 5 for amount', function (this: any) {
    const catalog: SupermarketCatalog = new FakeCatalog()
    const cart: ShoppingCart = new ShoppingCart()

    const toothbrush: Product = new Product('toothbrush', ProductUnit.Each)
    const apples: Product = new Product('apples', ProductUnit.Kilo)

    catalog.addProduct(toothbrush, 0.99)
    catalog.addProduct(apples, 1.99)

    cart.addItemQuantity(toothbrush, 5)
    cart.addItemQuantity(apples, 2.5)

    const teller: Teller = new Teller(catalog)
    teller.addSpecialOffer(SpecialOfferType.FiveForAmount, toothbrush, 7)

    const receipt: Receipt = teller.checksOutArticlesFrom(cart)

    this.verifyAsJSON({
      items: receipt.getItems(),
      discounts: receipt.getDiscounts()
    })
  })

  it('should generate receipt from shopping cart items with 10 percent discount', function (this: any) {
    const catalog: SupermarketCatalog = new FakeCatalog()
    const cart: ShoppingCart = new ShoppingCart()

    const toothbrush: Product = new Product('toothbrush', ProductUnit.Each)
    const apples: Product = new Product('apples', ProductUnit.Kilo)

    catalog.addProduct(toothbrush, 0.99)
    catalog.addProduct(apples, 1.99)

    cart.addItemQuantity(toothbrush, 4)
    cart.addItemQuantity(apples, 2.5)

    const teller: Teller = new Teller(catalog)
    teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, toothbrush, 10.0)

    const receipt: Receipt = teller.checksOutArticlesFrom(cart)

    this.verifyAsJSON({
      items: receipt.getItems(),
      discounts: receipt.getDiscounts()
    })
  })

  it('should generate receipt from shopping cart items with 10 percent discount for bundle', function (this: any) {
    const catalog: SupermarketCatalog = new FakeCatalog()
    const cart: ShoppingCart = new ShoppingCart()

    const coffee: Product = new Product('coffee', ProductUnit.Each)
    const milk: Product = new Product('milk', ProductUnit.Each)

    catalog.addProduct(coffee, 4.99)
    catalog.addProduct(milk, 2.99)

    cart.addItemQuantity(coffee, 1)
    cart.addItemQuantity(milk, 1)

    const teller: Teller = new Teller(catalog)
    teller.addSpecialBundleOffer([coffee, milk], cart.getItems(), 1.0)

    const receipt: Receipt = teller.checksOutArticlesFrom(cart)

    this.verifyAsJSON({
      items: receipt.getItems(),
      discounts: receipt.getDiscounts()
    })
  })

  it('should not apply 10 percent discount for bundle when item quantity is more than one', function (this: any) {
    const catalog: SupermarketCatalog = new FakeCatalog()
    const cart: ShoppingCart = new ShoppingCart()

    const coffee: Product = new Product('coffee', ProductUnit.Each)
    const milk: Product = new Product('milk', ProductUnit.Each)

    catalog.addProduct(coffee, 4.99)
    catalog.addProduct(milk, 2.99)

    cart.addItemQuantity(coffee, 2)
    cart.addItemQuantity(milk, 1)

    const teller: Teller = new Teller(catalog)
    teller.addSpecialBundleOffer([coffee, milk], cart.getItems(), 1.0)

    const receipt: Receipt = teller.checksOutArticlesFrom(cart)

    this.verifyAsJSON({
      items: receipt.getItems(),
      discounts: receipt.getDiscounts()
    })
  })
})
