const { expect } = require('chai')
const { Shop, Item } = require('../src/gilded_rose.js')

describe('Gilded Rose', () => {
  describe('Regular Item', () => {
    it('should update quality of regular item for 1 day', () => {
      const gildedRose = new Shop([new Item('Dexterity Vest', 10, 20)])
      const items = gildedRose.updateQuality()

      expect(items[0]).to.eql({
        name: 'Dexterity Vest',
        sellIn: 9,
        quality: 19
      })
    })

    it('should update quality of regular item with passed sell date for 1 day', () => {
      const gildedRose = new Shop([new Item('Dexterity Vest', 0, 20)])
      const items = gildedRose.updateQuality()

      expect(items[0]).to.eql({
        name: 'Dexterity Vest',
        sellIn: -1,
        quality: 18
      })
    })
  })
})
