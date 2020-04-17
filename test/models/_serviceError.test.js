const chai = require('chai')
const { ServiceError, ResultContext } = require('../../src/models/_serviceError')

chai.should()

describe('Service Error Tests', () => {

  it('Result context with errors', () => {
    const error = new ServiceError('invalid name', 'name')
    const hasErrors = new ResultContext(null, [error]).hasErrors()
    hasErrors.should.be.true
  })

  it('Result context with no errors', () => {
    const resultContext = new ResultContext('Boss Dude', null)
    const hasErrors = resultContext.hasErrors()
    hasErrors.should.be.false
    resultContext.value.should.eq('Boss Dude')
  })

})
