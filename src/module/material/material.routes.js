import express from 'express'
import { asyncWrapper } from '../../utils/asyncWrapper'
import { materialController } from './material.controller'

const materialRoutes = express.Router()

materialRoutes.get('/', (req, res, next) => {
  res.json({ message: 'from index api' })
})

// Create Material
materialRoutes.post('/create', asyncWrapper(materialController.create))

// Get all Material
materialRoutes.get('/all', asyncWrapper(materialController.findAll))

export { materialRoutes }
