import { Equipment } from './Equipment'
import { Stats } from './Stats'

export class Inventory {
  public constructor(private _equipment: Equipment) {
  }

  public get equipment(): Equipment {
    return this._equipment;
  }

  public getBaseDamage(): number {
    return this._equipment.getBaseDamage()
  }

  public getDamageModifier(stats: Stats): number {
    return this._equipment.getDamageModifier(stats)
  }
}
