import mongoose from 'mongoose'
import { settingSchema } from '../setting/setting.model'

const schema = mongoose.Schema

const userSchema = new schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  setting: settingSchema,
  trainings: [
    {
      type: mongoose.ObjectId,
      ref: 'training',
    },
  ],
})

const UserModel = mongoose.model('user', userSchema)
export { UserModel }
