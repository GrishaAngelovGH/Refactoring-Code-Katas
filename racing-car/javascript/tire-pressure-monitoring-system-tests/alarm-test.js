const chai = require('chai')
chai.should()

const Alarm = require('../tire-pressure-monitoring-system/alarm.js')

describe('Tyre Pressure Monitoring System', function () {
  describe('Alarm', function () {
    it('alarm is off by default', function () {
      const alarm = new Alarm()
      alarm.alarmOn().should.equal(false)
    })
  })
})
