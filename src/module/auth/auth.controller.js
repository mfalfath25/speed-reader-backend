import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from './auth.model'
import httpStatus from '../../utils/httpStatus'
import appConfig from '../../config/env'

const userController = {}

// Create User
userController.register = async (req, res, next) => {
  try {
    const isExistingUser = await UserModel.findOne({ email: req.body.email })
    if (isExistingUser) {
      return res.status(httpStatus.CONFLICT).json({
        status: 'ERROR',
        message: 'Email sudah terdaftar!',
      })
    } else {
      const user = new UserModel(req.body)
      if (req.body.password) {
        user.hash = await bcrypt.hashSync(req.body.password, 10)
      }
      user.password = user.hash
      user.setting = {} // initialize setting object with default values
      await user.save()
      return res.status(httpStatus.CREATED).json({
        status: 'OK',
        message: 'Registrasi berhasil',
        data: user,
      })
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'ERROR',
      message: 'Registrasi gagal',
      error: error.toString(),
    })
  }
}

// Login user
userController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email: email })
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        status: 'ERROR',
        message: 'User tidak ditemukan',
      })
    }
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ sub: user.id }, appConfig.jwt_key, {
        expiresIn: '7d',
      })
      return res.status(httpStatus.OK).json({
        status: 'OK',
        message: 'Login berhasil',
        userId: user._id,
        username: user.username,
        email: user.email,
        trainings: user.trainings,
        setting: user.setting,
        token: token,
      })
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({
        status: 'ERROR',
        message: 'Login gagal',
      })
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'ERROR',
      message: 'Login gagal',
      error: error.toString(),
    })
  }
}

// Get All Users
userController.findAll = async (req, res) => {
  try {
    const users = await UserModel.find()
    return res.json({
      status: 'OK',
      data: users,
    })
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: 'ERROR', error: error.toString() })
  }
}

// Get User by ID
userController.findOne = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.userId).populate('trainings')
    if (!user) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: 'ERROR',
        message: 'User tidak ditemukan',
      })
    }
    return res.json({
      status: 'OK',
      data: user,
    })
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: 'ERROR', error: error.toString() })
  }
}

// Update User by ID
userController.update = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.userId)
    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'ERROR', message: 'User tidak ditemukan' })
    }
    Object.assign(user, req.body)
    await user.save()
    return res.json({
      status: 'OK',
      message: 'Data berhasil diperbarui',
      data: user,
    })
  } catch (error) {
    return res.status(500).json({ status: 'ERROR', error: error.toString() })
  }
}

// Delete User by ID
userController.delete = async (req, res) => {
  try {
    let user = await UserModel.findByIdAndRemove(req.params.userId)
    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'ERROR', message: 'User tidak ditemukan' })
    }
    return res.json({ status: 'OK', message: 'User berhasil dihapus' })
  } catch (error) {
    return res.status(500).json({ status: 'ERROR', error: error.toString() })
  }
}

export default userController
