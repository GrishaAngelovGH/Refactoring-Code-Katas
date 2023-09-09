const chai = require('chai')
chai.should()

const TelemetryDiagnosticControls = require('../telemetry-system/telemetry-diagnostic-controls.js')
const TelemetryClient = require('../telemetry-system/telemetry-client.js')

describe('Telemetry System', function () {
  describe('TelemetryDiagnosticControls', function () {
    it('CheckTransmission should send a diagnostic message and receive a status message response', function () {
      const telemetryDiagnosticControls = new TelemetryDiagnosticControls(new TelemetryClient())
      telemetryDiagnosticControls.checkTransmission()
      telemetryDiagnosticControls.readDiagnosticInfo().should.equal('LAST TX rate................ 100 MBPS\r\nHIGHEST TX rate............. 100 MBPS\r\nLAST RX rate................ 100 MBPS\r\nHIGHEST RX rate............. 100 MBPS\r\nBIT RATE.................... 100000000\r\nWORD LEN.................... 16\r\nWORD/FRAME.................. 511\r\nBITS/FRAME.................. 8192\r\nMODULATION TYPE............. PCM/FM\r\nTX Digital Los.............. 0.75\r\nRX Digital Los.............. 0.10\r\nBEP Test.................... -5\r\nLocal Rtrn Count............ 00\r\nRemote Rtrn Count........... 00')
    })
  })
})
