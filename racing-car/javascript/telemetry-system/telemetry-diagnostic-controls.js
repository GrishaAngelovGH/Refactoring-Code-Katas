class TelemetryDiagnosticControls {
  constructor(telemetryClient) {
    this._diagnosticChannelConnectionString = function () { return '*111#' }
    this._telemetryClient = telemetryClient
    this._diagnosticInfo = ''
  }

  readDiagnosticInfo() {
    return this._diagnosticInfo
  }

  writeDiagnosticInfo(newValue) {
    this._diagnosticInfo = newValue
  }

  checkTransmission() {
    this._diagnosticInfo = ''

    this._telemetryClient.disconnect()

    let retryLeft = 3
    while (this._telemetryClient.onlineStatus() === false && retryLeft > 0) {
      this._telemetryClient.connect(this._diagnosticChannelConnectionString)
      retryLeft -= 1
    }

    if (this._telemetryClient.onlineStatus() === false) {
      throw 'Unable to connect'
    }

    this._telemetryClient.send(this._telemetryClient.constructor.diagnosticMessage())
    this._diagnosticInfo = this._telemetryClient.receive()
  }
}

module.exports = TelemetryDiagnosticControls
