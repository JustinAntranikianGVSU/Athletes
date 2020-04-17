
const wrapStatusCode = (statusCode) => (res, json) => {
  res.status(statusCode).json(json)
}

const wrap400 = wrapStatusCode(400)
const wrap404 = wrapStatusCode(404)

module.exports = { wrapStatusCode, wrap400, wrap404 }