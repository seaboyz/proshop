import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

import connectDB from './config/db.js'
import productsRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

// allow json in the request body(req.body)
// http://expressjs.com/en/api.html#express.json
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})

// @desc  Get PAYPAL_CLIENT_ID
// @route GET /api/config/paypal
// @access Public
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// requests to /api/products will be sent to productsRoutes
app.use('/api/products', productsRoutes)

// requests to /api/users will be sent to userRoutes
app.use('/api/users', userRoutes)

// request to /api/orders will be sent to orderRoutes
app.use('/api/orders', orderRoutes)

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
