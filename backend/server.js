import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

import connectDB from './config/db.js'
import productsRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running')
})

// requests to /api/products will be sent to productsRouter
app.use('/api/products', productsRoutes)

// https://expressjs.com/en/guide/error-handling.html
// express error handling
app.use(notFound)

// error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running on ${process.env.NODE_ENV} mode port ${PORT}`.yellow.bold
  )
)
