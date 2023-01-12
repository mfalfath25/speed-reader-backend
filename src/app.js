import express, { json } from 'express'

const app = express()

app.use(json())

const PORT = process.env.PORT || 3000

app.get('/', async (req, res) => {
  res.json({ status: true, message: 'Node app initialized' })
})

app.listen(PORT, () => console.log(`App listening at port ${PORT}`))
