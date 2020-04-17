const { ServiceError, ResultContext } = require('../models/_serviceError')
const { Athlete } = require('../models/athlete')

const athletes = [
  new Athlete(1, 'Justin Antranikian'),
  new Athlete(2, 'Bob Smith')
]

const getNotFoundErrors = (id) => [new ServiceError(`Could not find athlete with id : ${id}`)]

const getAthleteAsync = (id) => Promise.resolve(athletes.find(oo => oo.id === parseInt(id)))

const insertAthleteAsync = (athlete) => {
  athletes.push(athlete)
  Promise.resolve()
}

const getResultForFetchAsync = async (request) => {
  const {id} = request.params
  const athlete = await getAthleteAsync(id)
  return athlete ? new ResultContext(athlete, null) : new ResultContext(null, getNotFoundErrors(id))
}

const getResultForInsertAsync = async (request) => {
  const {name} = request.body

  if (!name) {
    const error = new ServiceError('name is missing', 'name')
    return new ResultContext(null, [error])
  }

  const newAthlete = new Athlete(3, request.body.name)
  await insertAthleteAsync(newAthlete)
  return new ResultContext(newAthlete, null)
}

const getResultForUpdateAsync = async (request) => {
  const {params: {id}, body: {name}} = request

  if (!name) {
    const error = new ServiceError('name is missing', 'name')
    return new ResultContext(null, [error])
  }

  const athlete = await getAthleteAsync(id)

  if (athlete) {
    athlete.name = name
    return new ResultContext(athlete, null)
  }

  return new ResultContext(null, getNotFoundErrors(id))
}

const getResultForDeleteAsync = async (request) => {
  const {id} = request.params
  const athlete = await getAthleteAsync(id)

  if (athlete) {
    athletes.splice(athletes.indexOf(athlete), 1)
    return new ResultContext(athlete, null)
  }

  return new ResultContext(null, getNotFoundErrors(id))
}

module.exports = {
  getResultForFetchAsync,
  getResultForInsertAsync,
  getResultForUpdateAsync,
  getResultForDeleteAsync
}