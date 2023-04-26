const { NotFoundError } = require('../errors')
const notFoundMW = (req, res, next) => {
  throw NotFoundError('Page Not Found')
}

module.exports = notFoundMW
