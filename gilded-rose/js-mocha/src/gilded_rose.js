class Item {
  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

class Shop {
  constructor(items = []) {
    this.items = items
    this.specialItems = {
      'Aged Brie': item => {
        item.sellIn = item.sellIn - 1

        item.quality = item.quality < 50 ? item.quality + 1 : item.quality
      },
      'Sulfuras, Hand of Ragnaros': () => { },
      'Backstage passes to a TAFKAL80ETC concert': item => {
        item.sellIn = item.sellIn - 1

        item.quality = item.sellIn > 10 ? item.quality + 1 : item.quality

        item.quality = item.sellIn < 11 ? item.quality + 2 : item.quality

        item.quality = item.sellIn < 6 ? item.quality + 1 : item.quality

        item.quality = item.sellIn < 0 ? 0 : item.quality

        item.quality = item.quality > 50 ? 50 : item.quality
      }
    }

    this.updateInventory = item => {
      const isSpecialItem = this.specialItems.hasOwnProperty(item.name)

      if (!isSpecialItem) {
        item.sellIn = item.sellIn - 1

        item.quality = item.quality > 0 ?
          (item.sellIn > 0 ? item.quality - 1 : item.quality - 2) : item.quality
      }

      isSpecialItem && this.specialItems[item.name](item)
    }
  }

  updateQuality() {
    this.items.forEach(item => {
      this.updateInventory(item)
    })

    return this.items
  }
}

module.exports = {
  Item,
  Shop
}
