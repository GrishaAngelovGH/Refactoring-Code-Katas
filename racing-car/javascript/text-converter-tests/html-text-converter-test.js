const chai = require('chai')
chai.should()

const HtmlTextConverter = require('../text-converter/html-text-converter.js')

describe('Html Converter', function () {
  describe('HtmlTextConverter', function () {
    it('should get filename', function () {
      const converter = new HtmlTextConverter('file.txt')
      converter.getFilename().should.equal('file.txt')
    })

    it('should convert text in a file to html', function () {
      const converter = new HtmlTextConverter('../text-converter-tests/file.txt')
      converter.convertToHtml().should.equal('first line<br />second line<br />third line')
    })
  })
})
