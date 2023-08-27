import { Equipment } from './Equipment'
import { Stats } from './Stats'

export class Inventory {
  public constructor(private _equipment: Equipment) { }

  private getBaseDamage(): number {
    return this._equipment.getBaseDamage()
  }

  private getDamageModifier(stats: Stats): number {
    return this._equipment.getDamageModifier(stats)
  }

  public getTotalDamage(stats: Stats): number {
    const baseDamage = this.getBaseDamage()
    const damageModifier = this.getDamageModifier(stats)
    return Math.round(baseDamage * damageModifier)
  }
}
