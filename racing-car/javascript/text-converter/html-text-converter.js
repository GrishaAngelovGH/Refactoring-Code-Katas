const fs = require('fs')
const path = require('path')

class HtmlTextConverter {
  constructor(filename) {
    this._filename = filename
  }

  convertToHtml() {
    const text = fs.readFileSync(path.resolve(__dirname, this._filename)).toString()

    const addANewLine = function () {
      const line = convertedLine.join('')
      html.push(line)
      convertedLine = []
    }

    const html = []
    let convertedLine = []

    for (let i = 0; i <= text.length; i++) {
      const characterToConvert = text.charAt(i)

      switch (characterToConvert) {
        case '<':
          convertedLine.push('&lt')
          break
        case '>':
          convertedLine.push('&gt')
          break
        case '&':
          convertedLine.push('&amp')
          break
        case '\n':
          addANewLine()
          break
        default:
          convertedLine.push(characterToConvert)
      }
    }

    addANewLine()

    return html.join('<br />')
  }

  getFilename() {
    return this._filename
  }
}

module.exports = HtmlTextConverter
