import ShoppingCart from '../Field/ShoppingCart';

describe('shopping cart', () => {
  let cart;
  beforeEach(() => (cart = new ShoppingCart()));

  describe('single product', () => {
    it('calculates the final price', () => {
      cart.add(10);

      expect(cart.calculateTotalPrice()).toBe(10);
    });

    it('knows the number of items', () => {
      cart.add(10);

      expect(cart.numberOfProducts()).toBe(1);
    });

    it('may offer discounts when there is at least one expensive product', () => {
      cart.add(120);

      expect(cart.hasDiscount()).toBeTruthy();
    });

    it('does not offer discount for cheap products', () => {
      cart.add(10);

      expect(cart.hasDiscount()).toBeFalsy();
    })
  })

  describe('multiple products', () => {
    it('calculates the final price', () => {
      cart.add(10);
      cart.add(11);
      cart.add(12);

      expect(cart.calculateTotalPrice()).toBe(33);
    });

    it('knows the number of items', () => {
      cart.add(10);
      cart.add(20);

      expect(cart.numberOfProducts()).toBe(2);
    });

    it('may offer discounts when there is at least one expensive product', () => {
      cart.add(80);
      cart.add(10);
      cart.add(20);

      expect(cart.hasDiscount()).toBeTruthy();
    });
  })
})
