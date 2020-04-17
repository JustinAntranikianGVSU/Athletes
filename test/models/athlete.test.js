const chai = require('chai')
const { Athlete } = require('../../src/models/athlete')

chai.should()

describe('Athlete Model Tests', () => {

  it('Athlete constructor sets all fields', () => {
    const athlete = new Athlete(15, 'Test Name')
    athlete.id.should.eq(15)
    athlete.name.should.eq('Test Name')
  })

})
