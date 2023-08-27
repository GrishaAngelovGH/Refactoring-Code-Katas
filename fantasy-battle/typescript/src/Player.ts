import { Damage } from './Damage'
import { Inventory } from './Inventory'
import { SimpleEnemy } from './SimpleEnemy'
import { Stats } from './Stats'
import { Target } from './Target'

export class Player extends Target {
  public constructor(private _inventory: Inventory, private _stats: Stats) {
    super()
  }

  calculateDamage(other: Target): Damage {
    const baseDamage = this._inventory.equipment.getBaseDamage()
    const damageModifier = this._inventory.equipment.getDamageModifier(this._stats)
    const totalDamage = Math.round(baseDamage * damageModifier)
    const soak = this.getSoak(other, totalDamage)
    return new Damage(Math.max(0, totalDamage - soak))
  }

  private getSoak(other: Target, totalDamage: number): number {
    let soak = 0
    if (other instanceof Player) {
      // TODO: Not implemented yet
      //  Add friendly fire
      soak = totalDamage
    } else if (other instanceof SimpleEnemy) {
      const simpleEnemy: SimpleEnemy = other
      soak = Math.round(simpleEnemy.armor.damageSoak *
        (simpleEnemy.buffs
          .reduce(
            (sum, buff) => sum + buff.soakModifier, 0)
          + 1)
      )
    }
    return soak
  }
}