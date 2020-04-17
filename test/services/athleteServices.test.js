const chai = require('chai')
const { getResultForFetchAsync, getResultForInsertAsync, getResultForUpdateAsync, getResultForDeleteAsync } = require('../../src/services/athleteService')

chai.should()

describe('Athlete Services Tests', () => {

  it('getResultForFetchAsync', async () => {
    const request = {
      params: {id: '1'}
    }

    const result = await getResultForFetchAsync(request)
    result.value.id.should.eq(1)
    result.value.name.should.eq('Justin Antranikian 2')
  })

  it('getResultForInsertAsync valid request', async () => {
    const request = {
      body: {name: 'Bob Smith 2'}
    }

    const result = await getResultForInsertAsync(request)
    result.hasErrors().should.be.false

    const {name, id} = result.value
    name.should.eq('Bob Smith 2')
    id.should.eq(3)
  })

  it('getResultForInsertAsync invalid request', async () => {
    const request = {
      body: {}
    }

    const result = await getResultForInsertAsync(request)
    result.hasErrors().should.be.true
    result.serviceErrors.length.should.eq(1)
    result.serviceErrors[0].errorMessage.should.eq('name is missing')
    result.serviceErrors[0].fieldName.should.eq('name')
  })

  it('getResultForUpdateAsync valid request', async () => {
    const request = {
      params: {id: '1'},
      body: {name: 'Justin Antranikian 32'}
    }

    const result = await getResultForUpdateAsync(request)
    result.hasErrors().should.be.false

    result.value.name.should.eq('Justin Antranikian 32')
    result.value.id.should.eq(1)
  })

  it('getResultForUpdateAsync invalid request', async () => {
    const request = {
      params: {id: '1'},
      body: {}
    }

    const result = await getResultForUpdateAsync(request)
    result.hasErrors().should.be.true
    result.serviceErrors.length.should.eq(1)
    result.serviceErrors[0].errorMessage.should.eq('name is missing')
    result.serviceErrors[0].fieldName.should.eq('name')
  })

  it('getResultForDeleteAsync valid request', async () => {
    const request = {
      params: {id: '1'}
    }

    const result = await getResultForDeleteAsync(request)
    result.hasErrors().should.be.false
    result.value.id.should.eq(1)
  })

  it('getResultForDeleteAsync invalid request', async () => {
    const request = {
      params: {id: '1'},
    }

    const result = await getResultForDeleteAsync(request)
    result.hasErrors().should.be.true
    result.serviceErrors.length.should.eq(1)
    result.serviceErrors[0].errorMessage.should.eq('Could not find athlete with id : 1')
  })

})
