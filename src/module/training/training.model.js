import mongoose from 'mongoose'

const schema = mongoose.Schema

const trainingSchema = new schema({
  traineeId: String,
  mode: String,
  text: {
    textLevel: {
      type: String,
      default: '',
    },
    textChoice: {
      type: String,
      default: '',
    },
    textWordCount: Number,
  },
  wpm: Number,
  accuracy: {
    type: Number,
    default: 0,
  },
  readTime: Number,
  readDate: Date,
})

const TrainingModel = mongoose.model('training', trainingSchema)
export { TrainingModel }
