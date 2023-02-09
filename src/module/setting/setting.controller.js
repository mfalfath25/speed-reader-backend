import httpStatus from "../../utils/httpStatus"
import { SettingModel } from "./setting.model"
import { UserModel } from "../auth/auth.model"

const settingController = {}

// Get all Setting
settingController.findAll = async (req, res) => {
  try {
    const setting = await SettingModel.find()
    return res.status(httpStatus.OK).json({
      status: "OK",
      data: setting,
    })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: "Data tidak ditemukan",
      error: error.toString(),
    })
  }
}

// Get Setting by userId
settingController.findOne = async (req, res) => {
  try {
    const setting = await SettingModel.find({ traineeId: req.params.userId })
    if (!setting) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "ERROR",
        message: "Setting tidak ditemukan",
      })
    } else {
      return res.status(httpStatus.OK).json({
        status: "OK",
        data: setting,
      })
    }
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", error: error.toString() })
  }
}

// Update Setting by userId
settingController.update = async (req, res) => {
  try {
    const setting = await SettingModel.findOneAndUpdate(
      { traineeId: req.params.userId },
      req.body,
      { new: true }
    )
    if (!setting) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: "ERROR", message: "Data tidak ditemukan" })
    }
    return res.json({
      status: "OK",
      message: "Tampilan berhasil dipebarui",
      setting: setting,
    })
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", error: error.toString() })
  }
}

export default settingController
