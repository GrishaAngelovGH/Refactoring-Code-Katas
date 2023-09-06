class Alarm {
  constructor(sensor) {
    this._lowPressureThreshold = 17
    this._highPressureThreshold = 21
    this._sensor = sensor
    this._alarmOn = false
  }

  check() {
    const psiPressureValue = this._sensor.popNextPressurePsiValue()

    if (psiPressureValue < this._lowPressureThreshold || this._highPressureThreshold < psiPressureValue) {
      this._alarmOn = true
    }
  }

  alarmOn() {
    return this._alarmOn
  }
}

module.exports = Alarm
