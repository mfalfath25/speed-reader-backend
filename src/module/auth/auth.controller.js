import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import httpStatus from '../../utils/httpStatus'
import appConfig from '../../config/env'
import { UserModel } from './auth.model'
import { SettingModel } from '../setting/setting.model'

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
        user.hash = bcrypt.hashSync(req.body.password, 10)
      }
      user.password = user.hash

      user.save().then((user) => {
        const setting = new SettingModel({
          traineeId: user._id,
          isFontSerif: false,
          fixationCount: 0,
          fontColor: '#000000',
        })
        setting.save().then((setting) => {
          user.setting = setting._id
          user.save()
        })

        return res.status(httpStatus.CREATED).json({
          status: 'OK',
          message: 'Registrasi berhasil',
        })
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
      .populate('trainings')
      .populate('setting')
      .exec()
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

// Get User by userId
userController.findOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId)
      .populate('trainings')
      .populate('setting')
      .exec()
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

// Update User by userId
userController.update = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'ERROR', message: 'User tidak ditemukan' })
    } else {
      return res.json({
        status: 'OK',
        message: 'Data berhasil diperbarui',
        data: user.username,
      })
    }
  } catch (error) {
    return res.status(500).json({ status: 'ERROR', error: error.toString() })
  }
}

// Delete User by userId
userController.delete = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndRemove(req.params.userId)
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
