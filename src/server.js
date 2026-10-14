import 'dotenv/config'
import express from 'express'
import { MongoClient } from 'mongodb'

const app = express()
const PORT = 3000
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
const client = new MongoClient(mongoUri)
const dbName = 'budetmanager'
async function connectToDatabase() {
  await client.connect()
  console.log('Connected to MongoDB!')

  return client.db(dbName)
}
app.use(express.json())
app.use(express.static('src/public'))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})


app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await app.locals.db
      .collection('transactions')
      .find()
      .toArray()

    res.json(transactions)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not load transactions.' })
  }
})


app.post('/api/transactions', async (req, res) => {
  try {
    const transaction = {
      description: req.body.description,
      amount: Number(req.body.amount),
      type: req.body.type,
      category: req.body.category,
      date: req.body.date
    }

    const result = await app.locals.db
      .collection('transactions')
      .insertOne(transaction)

    res.status(201).json({
      _id: result.insertedId,
      ...transaction
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not save transaction.' })
  }
})


connectToDatabase()
  .then((db) => {
    app.locals.db = db

    app.listen(PORT, () => {
      console.log(`Servern körs på http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Could not connect to MongoDB:', error)
  })

