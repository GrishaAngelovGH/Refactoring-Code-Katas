export const PARROT_TYPES = {
  EUROPEAN: 'EUROPEAN',
  AFRICAN: 'AFRICAN',
  NORWEGIAN_BLUE: 'NORWEGIAN_BLUE',
}

export class Parrot {
  constructor(numberOfCoconuts, voltage, isNailed) {
    this.numberOfCoconuts = numberOfCoconuts
    this.voltage = voltage
    this.isNailed = isNailed
  }

  static create(type, numberOfCoconuts, voltage, isNailed) {
    switch (type) {
      case PARROT_TYPES.EUROPEAN:
        return new EuropeanParrot(numberOfCoconuts, voltage, isNailed)
      case PARROT_TYPES.AFRICAN:
        return new AficanParrot(numberOfCoconuts, voltage, isNailed)
      case PARROT_TYPES.NORWEGIAN_BLUE:
        return new NorwegianBlueParrot(numberOfCoconuts, voltage, isNailed)
    }
    throw new Error("Should be unreachable")
  }

  getSpeed() {
    return 0
  }

  getBaseSpeedWithVoltage(voltage) {
    return Math.min(24, voltage * this.getBaseSpeed())
  }

  getLoadFactor() {
    return 9
  }

  getBaseSpeed() {
    return 12
  }
}

class EuropeanParrot extends Parrot {
  constructor(numberOfCoconuts, voltage, isNailed) {
    super(numberOfCoconuts, voltage, isNailed)
  }

  getSpeed() {
    return this.getBaseSpeed()
  }
}

class AficanParrot extends Parrot {
  constructor(numberOfCoconuts, voltage, isNailed) {
    super(numberOfCoconuts, voltage, isNailed)
  }

  getSpeed() {
    return Math.max(0, this.getBaseSpeed() - this.getLoadFactor() * this.numberOfCoconuts)
  }
}

class NorwegianBlueParrot extends Parrot {
  constructor(numberOfCoconuts, voltage, isNailed) {
    super(numberOfCoconuts, voltage, isNailed)
  }

  getSpeed() {
    return (this.isNailed) ? 0 : this.getBaseSpeedWithVoltage(this.voltage)
  }
}