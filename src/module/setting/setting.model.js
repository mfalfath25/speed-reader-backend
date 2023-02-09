import mongoose from 'mongoose'

const schema = mongoose.Schema

const settingSchema = new schema({
  traineeId: {
    type: String,
    required: true,
  },
  isFontSerif: {
    type: Boolean,
    default: false,
  },
  fixationCount: {
    type: Number,
    default: 0,
  },
  fontColor: {
    type: String,
    default: '#000000',
  },
})

const SettingModel = mongoose.model('setting', settingSchema)
export { SettingModel }
