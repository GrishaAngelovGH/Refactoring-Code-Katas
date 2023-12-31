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

    it('should update 0 quality of regular item with for 1 day', () => {
      const gildedRose = new Shop([new Item('Dexterity Vest', 10, 0)])
      const items = gildedRose.updateQuality()

      expect(items[0]).to.eql({
        name: 'Dexterity Vest',
        sellIn: 9,
        quality: 0
      })
    })
  })

  describe('Aged Brie', () => {
    it('should update quality of aged brie for 1 day', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 2, 0)])
      const items = gildedRose.updateQuality()

      expect(items[0]).to.eql({
        name: 'Aged Brie',
        sellIn: 1,
        quality: 1
      })
    })

    it('should not pass max quality after update of aged brie for 1 day', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 2, 50)])
      const items = gildedRose.updateQuality()

      expect(items[0]).to.eql({
        name: 'Aged Brie',
        sellIn: 1,
        quality: 50
      })
    })
  })

  describe('Sulfuras', () => {
    it('should update quality of Sulfuras for 1 day', () => {
      const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 5, 80)])
      const items = gildedRose.updateQuality()

      expect(items[0]).to.eql({
        name: 'Sulfuras, Hand of Ragnaros',
        sellIn: 5,
        quality: 80
      })
    })
  })

  describe('Backstage passes', () => {
    it('should update quality of Backstage passes for 1 day', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)])
      const items = gildedRose.updateQuality()

      expect(items[0]).to.eql({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 14,
        quality: 21
      })
    })

    it('should update quality of Backstage passes with 10 days left for 1 day', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)])
      const items = gildedRose.updateQuality()

      expect(items[0]).to.eql({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 9,
        quality: 22
      })
    })

    it('should not pass max quality after update of Backstage passes with 10 days left for 1 day', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49)])
      const items = gildedRose.updateQuality()

      expect(items[0]).to.eql({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 9,
        quality: 50
      })
    })

    it('should update quality of Backstage passes with 5 days left for 1 day', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)])
      const items = gildedRose.updateQuality()

      expect(items[0]).to.eql({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 4,
        quality: 23
      })
    })

    it('should not pass max quality after update of Backstage passes with 5 days left for 1 day', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)])
      const items = gildedRose.updateQuality()

      expect(items[0]).to.eql({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: 4,
        quality: 50
      })
    })

    it('should drop quality to 0 after update of Backstage passes with passed sell date for 1 day', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 49)])
      const items = gildedRose.updateQuality()

      expect(items[0]).to.eql({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        sellIn: -1,
        quality: 0
      })
    })
  })

  describe('Conjured Items', () => {
    it('should update quality of conjured item for 1 day', () => {
      const gildedRose = new Shop([new Item('Conjured Mana Cake', 3, 6)])
      const items = gildedRose.updateQuality()

      expect(items[0]).to.eql({
        name: 'Conjured Mana Cake',
        sellIn: 2,
        quality: 4
      })
    })
  })
})
