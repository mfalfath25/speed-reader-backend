import express, { json } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import baseRouter from './routes'
import appConfig from './config/env'
import connectMongo from './config/mongoconnect'

const app = express()

const isProduction = process.env.NODE_ENV === 'production'

app.use(json())
if (!isProduction) {
  app.use(morgan('dev'))
}

// CORS & Headers config
app.use(
  cors({
    origin: appConfig.CLIENT_URL,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true,
  })
)

app.get('/', async (req, res) => {
  res.json({
    status: true,
    message: 'Speed-Reader Backend API',
  })
})

app.use('/', baseRouter)

connectMongo().catch((error) => {
  console.error('Failed to connect to MongoDB:', error)
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running on Production? ${isProduction}`)
  console.log(`Server is running on PORT ${PORT}`)
})

process.on('uncaughtException', (err, origin) => {
  console.error('An uncaught error occurred!')
  console.error(err)
  console.error('Origin: ', origin)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})