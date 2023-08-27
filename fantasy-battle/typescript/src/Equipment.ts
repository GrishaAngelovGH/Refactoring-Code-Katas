import { Item } from './Item'
import { Stats } from './Stats'

export class Equipment {

  public constructor(
    private _leftHand: Item,
    private _rightHand: Item,
    private _head: Item,
    private _feet: Item,
    private _chest: Item) { }

  public get leftHand(): Item {
    return this._leftHand
  }

  public get rightHand(): Item {
    return this._rightHand
  }

  public get head(): Item {
    return this._head
  }

  public get feet(): Item {
    return this._feet
  }

  public get chest(): Item {
    return this._chest
  }

  public getBaseDamage(): number {
    return (
      this._leftHand.baseDamage +
      this._rightHand.baseDamage +
      this._head.baseDamage +
      this._feet.baseDamage +
      this._chest.baseDamage
    )
  }

  public getDamageModifier(stats: Stats): number {
    const strengthModifier: number = stats.strength * 0.1

    return (
      strengthModifier +
      this._leftHand.damageModifier +
      this._rightHand.damageModifier +
      this._head.damageModifier +
      this._feet.damageModifier +
      this._chest.damageModifier
    )
  }
}
