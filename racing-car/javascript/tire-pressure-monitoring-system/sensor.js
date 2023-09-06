// The reading of the pressure value from the sensor is simulated in this implementation.
// Because the focus of the exercise is on the other class.

class Sensor {
  constructor() {
    this.offset = 16
  }

  samplePressure() {
    // placeholder implementation that simulate a real sensor in a real tire
    return Math.floor(6 * Math.random() * Math.random())
  }

  popNextPressurePsiValue() {
    return this.offset + samplePressure()
  }
}

module.exports = Sensor
