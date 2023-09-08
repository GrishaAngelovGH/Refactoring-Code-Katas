const fs = require('fs')
const path = require('path')

class HtmlTextConverter {
  constructor(filename) {
    this._filename = filename
  }

  convertToHtml() {
    const text = fs.readFileSync(path.resolve(__dirname, this._filename)).toString()

    const stashNextCharacterAndAdvanceThePointer = function () {
      const c = text.charAt(i)
      i += 1
      return c
    }

    const addANewLine = function () {
      const line = convertedLine.join('')
      html.push(line)
      convertedLine = []
    }

    let i = 0
    const html = []
    let convertedLine = []
    let characterToConvert = stashNextCharacterAndAdvanceThePointer()

    while (i <= text.length) {
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

      characterToConvert = stashNextCharacterAndAdvanceThePointer()
    }

    addANewLine()

    return html.join('<br />')
  }

  getFilename() {
    return this._filename
  }
}

module.exports = HtmlTextConverter
