const fs = require('fs')
const path = require('path')

class HtmlTextConverter {
  constructor(filename) {
    this._filename = filename
  }

  convertToHtml() {
    const text = fs.readFileSync(path.resolve(__dirname, this._filename)).toString()
    const html = []
    let convertedLine = []

    const specialCharacters = {
      '<': () => {
        convertedLine.push('&lt')
      },
      '>': () => {
        convertedLine.push('&gt')
      },
      '&': () => {
        convertedLine.push('&amp')
      },
      '\n': () => {
        html.push(convertedLine.join(''))
        convertedLine = []
      }
    }

    for (let i = 0; i <= text.length; i++) {
      const characterToConvert = text.charAt(i)
      const specialCharacter = specialCharacters[characterToConvert]

      specialCharacter ?
        specialCharacters[characterToConvert]() :
        convertedLine.push(characterToConvert)
    }

    html.push(convertedLine.join(''))

    return html.join('<br />')
  }

  getFilename() {
    return this._filename
  }
}

module.exports = HtmlTextConverter
