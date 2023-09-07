var fs = require('fs');
var path = require('path');

HtmlTextConverter = function (filename) {
  this._filename = filename;
};

HtmlTextConverter.prototype = {

  convertToHtml: function () {
    var text = fs.readFileSync(path.resolve(__dirname, this._filename)).toString();

    var stashNextCharacterAndAdvanceThePointer = function () {
      var c = text.charAt(i);
      i += 1;
      return c;
    };

    var addANewLine = function () {
      var line = convertedLine.join('');
      html.push(line);
      convertedLine = [];
    };

    var pushACharacterToTheOutput = function () {
      convertedLine.push(characterToConvert);
    };

    var i = 0;
    var html = [];
    var convertedLine = [];
    var characterToConvert = stashNextCharacterAndAdvanceThePointer();
    while (i <= text.length) {

      switch (characterToConvert) {
        case '<':
          convertedLine.push('&lt;');
          break;
        case '>':
          convertedLine.push('&gt;');
          break;
        case '&':
          convertedLine.push('&amp;');
          break;
        case '\n':
          addANewLine();
          break;
        default:
          pushACharacterToTheOutput();
      }

      characterToConvert = stashNextCharacterAndAdvanceThePointer();
    }

    addANewLine();
    return html.join('<br />');
  },

  getFilename: function () {
    return this._filename;
  }
};

module.exports = HtmlTextConverter;
