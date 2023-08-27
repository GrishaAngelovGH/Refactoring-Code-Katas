import { BasicBuff } from '../src/BasicBuff'
import { BasicItem } from '../src/BasicItem'
import { Damage } from '../src/Damage'
import { Equipment } from '../src/Equipment'
import { Inventory } from '../src/Inventory'
import { Player } from '../src/Player'
import { SimpleArmor } from '../src/SimpleArmor'
import { SimpleEnemy } from '../src/SimpleEnemy'
import { Stats } from '../src/Stats'

describe('Player', () => {
  it('calculates damage', () => {
    const equipment = new Equipment(
      new BasicItem('round shield', 0, 1.4),
      new BasicItem('excalibur', 20, 1.5),
      new BasicItem('helmet of swiftness', 0, 1.2),
      new BasicItem('ten league boots', 0, 0.1),
      new BasicItem('breastplate of steel', 0, 1.4)
    )

    const inventory = new Inventory(equipment)
    const stats = new Stats(1)
    const enemy = new SimpleEnemy(
      new SimpleArmor(5),
      [new BasicBuff(1, 1)]
    )

    const damage: Damage = new Player(inventory, stats).calculateDamage(enemy)
    expect(damage.amount).toBe(104)
  })
})
