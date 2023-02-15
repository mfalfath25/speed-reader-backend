import httpStatus from '../../utils/httpStatus'
import { MaterialModel } from './material.model'

const materialController = {}

// Create Material
materialController.create = async (req, res) => {
  try {
    const material = await MaterialModel.create(req.body)
    return res.status(httpStatus.CREATED).json({
      status: 'OK',
      message: 'Data ditambahkan',
      data: material,
    })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'ERROR',
      message: 'Data tidak ditemukan',
      error: error.toString(),
    })
  }
}

// Get All Material
materialController.findAll = async (req, res) => {
  try {
    const material = await MaterialModel.find()
    return res.status(httpStatus.OK).json({
      status: 'OK',
      data: material,
    })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'ERROR',
      message: 'Data tidak ditemukan',
      error: error.toString(),
    })
  }
}

export { materialController }
