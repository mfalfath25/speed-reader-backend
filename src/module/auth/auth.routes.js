import express from 'express'
import userController from './auth.controller'
import { asyncWrapper } from '../../utils/asyncWrapper'
import auth from '../../middleware/auth.middleware'

const authRoutes = express.Router()

authRoutes.get('/', (req, res, next) => {
  res.json({ message: 'from index api' })
})

// Create User
authRoutes.post('/register', asyncWrapper(userController.register))

// Login User
authRoutes.post('/login', asyncWrapper(userController.login))

// Get All Users
authRoutes.get('/users', auth, asyncWrapper(userController.findAll))

// Get User by userId
authRoutes.get('/users/:userId', auth, asyncWrapper(userController.findOne))

// Update User by userId
authRoutes.put('/users/:userId', auth, asyncWrapper(userController.update))

// Delete User by userId
authRoutes.delete('/users/:userId', auth, asyncWrapper(userController.delete))

export { authRoutes }
