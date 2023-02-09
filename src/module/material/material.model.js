import mongoose from "mongoose"

const schema = mongoose.Schema

const materialSchema = new schema({
  textLevel: {
    type: String,
    required: true,
  },
  textChoice: {
    type: String,
    required: true,
  },
  textValue: {
    type: String,
    required: true,
  },
  quiz: [
    {
      question: {
        type: String,
        required: true,
      },
      correct_answer: {
        type: String,
        required: true,
      },
      incorrect_answers: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
})

const MaterialModel = mongoose.model("material", materialSchema)
export { MaterialModel }
