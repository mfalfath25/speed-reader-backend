import httpStatus from '../../utils/httpStatus'
import { TrainingModel } from './training.model'
import { UserModel } from '../auth/auth.model'

const trainingController = {}

// Create Training
trainingController.add = async (req, res, next) => {
  try {
    const training = new TrainingModel({
      traineeId: req.params.userId,
      mode: req.body.mode,
      text: {
        textLevel: req.body.text.textLevel,
        textChoice: req.body.text.textChoice,
        textWordCount: req.body.text.textWordCount,
      },
      wpm: req.body.wpm,
      accuracy: req.body.accuracy,
      readTime: req.body.readTime,
      readDate: req.body.readDate,
    })
    training.save().then((training) => {
      UserModel.findById(req.params.userId, (err, user) => {
        if (err) return handleError(err)
        user.trainings.push(training)
        user.save()
      })
      res.status(httpStatus.CREATED).json({
        status: 'OK',
        message: 'Data berhasil tersimpan',
        data: { training },
      })
    })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'ERROR',
      message: 'Data tidak tersimpan',
      error: error.toString(),
    })
  }
}

// Get All Training
trainingController.findAll = async (req, res) => {
  try {
    const training = await TrainingModel.find()
    return res.status(httpStatus.OK).json({
      status: 'OK',
      data: { training },
    })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'ERROR',
      message: 'Data tidak ditemukan',
      error: error.toString(),
    })
  }
}

// Get Training by userId
trainingController.findByUserId = async (req, res) => {
  try {
    const training = await TrainingModel.find({ traineeId: req.params.userId })
    if (!training) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: 'ERROR',
        message: 'Data training tidak ditemukan',
      })
    } else {
      return res.status(httpStatus.OK).json({
        status: 'OK',
        data: { training },
      })
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'ERROR',
      message: 'Data tidak ditemukan',
      error: error.toString(),
    })
  }
}

// Delete Training by trainingId
trainingController.delete = async (req, res, next) => {
  try {
    const training = await TrainingModel.findByIdAndDelete(req.params.trainingId)
    if (training) {
      return res.status(httpStatus.OK).json({
        status: 'OK',
        message: 'Data berhasil dihapus',
      })
    } else {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'ERROR',
        message: 'Data tidak ditemukan',
      })
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'ERROR',
      message: 'Data tidak ditemukan',
      error: error.toString(),
    })
  }
}

export default trainingController
