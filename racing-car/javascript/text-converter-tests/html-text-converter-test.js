const chai = require('chai')
chai.should()

const HtmlTextConverter = require('../text-converter/html-text-converter.js')

describe('Html Converter', function () {
  describe('HtmlTextConverter', function () {
    it('should get filename', function () {
      const converter = new HtmlTextConverter('file.txt')
      converter.getFilename().should.equal('file.txt')
    })
  })
})
