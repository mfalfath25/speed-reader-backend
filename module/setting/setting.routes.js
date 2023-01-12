import express from 'express'
import settingController from './setting.controller'
import { asyncWrapper } from '../../utils/asyncWrapper'
import auth from '../../middleware/auth.middleware'

const settingRoutes = express.Router()

settingRoutes.get('/', (req, res, next) => {
  res.json({ message: 'from index api' })
})

// Get User Setting
settingRoutes.get('/:userId', auth, asyncWrapper(settingController.findOne))

// Update User Setting
settingRoutes.put('/:userId', auth, asyncWrapper(settingController.update))

export { settingRoutes }
