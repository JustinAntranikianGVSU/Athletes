const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const server = require('../../index')

chai.should()
chai.use(chaiHttp)

describe('Athlete Api Tests', () => {

  it('Get/:id returns athlete', (done) => {
    chai.request(server).get('/api/athletes/1').end((error, response) => {
      response.should.have.status(201)
      response.body.id.should.eq(1)
      response.body.name.should.eq('Justin Antranikian')
      done()
    })
  })

  it('Get/:id return 404 for athlete that does not exist', (done) => {
    chai.request(server).get('/api/athletes/111').end((error, response) => {
      response.should.have.status(404)

      const errorsAsJson = JSON.parse(response.error.text)
      errorsAsJson.length.should.eq(1)
      errorsAsJson[0].errorMessage.should.eq('Could not find athlete with id : 111')
      expect(errorsAsJson[0].fieldName).to.be.a('null')
      done()
    })
  })

  it('Post with correct information returns 200', (done) => {

    const request = chai.request(server)
                      .post('/api/athletes')
                      .set('content-type', 'application/json')
                      .send({ name: 'Bobby Knight'})

    request.end((error, response) => {
      response.should.have.status(200)
      response.body.id.should.eq(3)
      response.body.name.should.eq('Bobby Knight')
      done()
    })
  })

  it('Post with missing information returns validation error', (done) => {

    const request = chai.request(server)
                      .post('/api/athletes')
                      .set('content-type', 'application/json')
                      .send({})

    request.end((error, response) => {
      response.should.have.status(400)

      const errorsAsJson = JSON.parse(response.error.text)
      errorsAsJson.length.should.eq(1)
      errorsAsJson[0].errorMessage.should.eq('name is missing')
      errorsAsJson[0].fieldName.should.eq('name')
      done()
    })
  })

  it('Put with correct information returns 200', (done) => {

    const request = chai.request(server)
                      .put('/api/athletes/1')
                      .set('content-type', 'application/json')
                      .send({ name: 'Justin Antranikian 2'})

    request.end((error, response) => {
      response.should.have.status(200)
      response.body.id.should.eq(1)
      response.body.name.should.eq('Justin Antranikian 2')
      done()
    })
  })

  it('Put with missing information returns validation error', (done) => {

    const request = chai.request(server)
                      .put('/api/athletes/1')
                      .set('content-type', 'application/json')
                      .send({})

    request.end((error, response) => {
      response.should.have.status(400)

      const errorsAsJson = JSON.parse(response.error.text)
      errorsAsJson.length.should.eq(1)
      errorsAsJson[0].errorMessage.should.eq('name is missing')
      errorsAsJson[0].fieldName.should.eq('name')
      done()
    })
  })

})
