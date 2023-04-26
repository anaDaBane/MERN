const express = require('express')
require('dotenv').config()
const connectDb = require('./db/connect')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/users')
const postRouter = require('./routers/posts')
const notFoundMW = require('./middlewares/notFoundMW')
const errorHandlerMW = require('./middlewares/errorHandlerMW')

require('express-async-errors')
const cors = require('cors')
const app = express()

//middlewares
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use(express.json())
app.use(cookieParser())

app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/api/v1/user', userRouter)
app.use('/api/v1/post', postRouter)

app.use(notFoundMW)
app.use(errorHandlerMW)
const port = process.env.PORT || 4000
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    console.log(`Db connected`)
    app.listen(port, () => {
      console.log(`App listening at ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
