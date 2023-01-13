import express from 'express'
import { UserModel } from '../auth/auth.model'
import httpStatus from '../../utils/httpStatus'

const settingController = {}

// Get User Setting
settingController.findOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId)
    if (!user) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: 'ERROR',
        message: 'User tidak ditemukan',
      })
    }
    return res.json({
      status: 'OK',
      setting: user.setting,
    })
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: 'ERROR', error: error.toString() })
  }
}

// Update User Setting
settingController.update = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId)
    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'ERROR', message: 'User tidak ditemukan' })
    }
    Object.assign(user.setting, req.body)
    await user.save()
    return res.json({
      status: 'OK',
      message: 'Tampilan berhasil dipebarui',
      setting: user.setting,
    })
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: 'ERROR', error: error.toString() })
  }
}

export default settingController
