import express from 'express'
import apiRoutes from './api'

const baseRouter = express.Router()

baseRouter.use('/api/v1', apiRoutes)

export default baseRouter
