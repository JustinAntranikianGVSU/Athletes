const express = require('express')
const router = express.Router()
const { wrap400, wrap404 } = require('./_statusCodes')
const {
  getResultForFetchAsync,
  getResultForInsertAsync,
  getResultForUpdateAsync,
  getResultForDeleteAsync
} = require('../services/athleteService')

router.get('/:id', async (req, res) => {
  const resultContext = await getResultForFetchAsync(req)
  resultContext.hasErrors() ? wrap404(res, resultContext.serviceErrors) : res.send(resultContext.value)
})

router.post('/', async (req, res) => {
  const resultContext = await getResultForInsertAsync(req)
  resultContext.hasErrors() ? wrap400(res, resultContext.serviceErrors) : res.send(resultContext.value)
})

router.put('/:id', async (req, res) => {
  const resultContext = await getResultForUpdateAsync(req)
  resultContext.hasErrors() ? wrap400(res, resultContext.serviceErrors) : res.send(resultContext.value)
})

router.delete('/:id', async (req, res) => {
  const resultContext = await getResultForDeleteAsync(req)
  resultContext.hasErrors() ? wrap400(res, resultContext.serviceErrors) : res.send(resultContext.value)
})

module.exports = router