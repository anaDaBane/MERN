const errorHandlerMW = (err, req, res, next) => {
  let errObj = {
    status: err.statusCode || 500,
    message: err.message || 'Internal Server Error',
  }

  return res.status(errObj.status).json({ msg: errObj.message })
}

module.exports = errorHandlerMW
