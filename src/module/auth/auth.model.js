import mongoose from 'mongoose'

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
  setting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'setting',
  },
  trainings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'training',
    },
  ],
})

const UserModel = mongoose.model('trainee', userSchema)
export { UserModel }
