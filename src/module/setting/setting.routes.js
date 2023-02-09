import express from 'express'
import settingController from './setting.controller'
import { asyncWrapper } from '../../utils/asyncWrapper'
import auth from '../../middleware/auth.middleware'

const settingRoutes = express.Router()

settingRoutes.get('/', (req, res, next) => {
  res.json({ message: 'from index api' })
})
// Get all Setting
settingRoutes.get('/all', auth, asyncWrapper(settingController.findAll))

// Get Setting by userId
settingRoutes.get('/:userId', auth, asyncWrapper(settingController.findOne))

// Update Setting by userId
settingRoutes.put('/:userId', auth, asyncWrapper(settingController.update))

export { settingRoutes }
