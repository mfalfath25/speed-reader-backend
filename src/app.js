import express, { json } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import baseRouter from './routes'
import appConfig from './config/env'
import connectMongo from './config/mongoconnect'

const app = express()

const isProduction = process.env.NODE_ENV === 'production'

app.use(json())
app.use(morgan('dev'))

// CORS config
app.use(
  cors({
    origin: appConfig.CLIENT_URL,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    credentials: true,
  })
)

// Headers config
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', appConfig.CLIENT_URL)
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.get('/', async (req, res) => {
  res.json({
    status: true,
    message: 'Speed-Reader Backend API',
  })
})
app.use('/', baseRouter)

connectMongo()

const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server running on Production? ${isProduction}`)
  console.log(`Server is running on PORT ${PORT}`)
})
