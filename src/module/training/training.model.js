import mongoose from 'mongoose'

const schema = mongoose.Schema

const trainingSchema = new schema({
  traineeId: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    default: '',
  },
  text: {
    textLevel: {
      type: String,
      default: '',
    },
    textChoice: {
      type: String,
      default: '',
    },
    textWordCount: {
      type: Number,
      default: 0,
    },
  },
  wpm: {
    type: Number,
    default: 0,
  },
  accuracy: {
    type: Number,
    default: 0,
  },
  readTime: {
    type: Number,
    default: 0,
  },
  readDate: {
    type: Date,
    default: Date.now,
  },
})

const TrainingModel = mongoose.model('training', trainingSchema)
export { TrainingModel }
