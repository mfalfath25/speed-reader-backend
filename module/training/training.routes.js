import express from 'express'
import trainingController from './training.controller'
import { asyncWrapper } from '../../utils/asyncWrapper'
import auth from '../../middleware/auth.middleware'

const trainingRoutes = express.Router()

trainingRoutes.get('/', (req, res, next) => {
  res.json({ message: 'from index api' })
})

// Create
trainingRoutes.post('/add/:userId', auth, asyncWrapper(trainingController.add))

// Get All Data
trainingRoutes.get('/all', auth, asyncWrapper(trainingController.findAll))

// Get by userId
trainingRoutes.get('/user/:userId', auth, asyncWrapper(trainingController.findByUserId))

// Delete
trainingRoutes.delete('/delete/:trainingId', auth, asyncWrapper(trainingController.delete))

export { trainingRoutes }
