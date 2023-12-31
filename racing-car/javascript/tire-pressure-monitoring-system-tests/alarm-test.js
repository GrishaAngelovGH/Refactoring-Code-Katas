const chai = require('chai')
chai.should()

const Alarm = require('../tire-pressure-monitoring-system/alarm.js')

class MockPressureSensor {
  constructor(psiValue) {
    this.psiValue = psiValue
  }

  popNextPressurePsiValue() {
    return this.psiValue
  }
}

describe('Tyre Pressure Monitoring System', function () {
  describe('Alarm', function () {
    it('alarm is off by default', function () {
      const alarm = new Alarm()
      alarm.alarmOn().should.equal(false)
    })

    it('should not activate alarm for pressure measurement in range', function () {
      const alarm = new Alarm(new MockPressureSensor(19))

      alarm.check()
      alarm.alarmOn().should.equal(false)
    })

    it('should activate alarm for low pressure measurement', function () {
      const alarm = new Alarm(new MockPressureSensor(15))

      alarm.check()
      alarm.alarmOn().should.equal(true)
    })

    it('should activate alarm for high pressure measurement', function () {
      const alarm = new Alarm(new MockPressureSensor(23))

      alarm.check()
      alarm.alarmOn().should.equal(true)
    })
  })
})
