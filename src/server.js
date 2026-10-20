
import 'dotenv/config'
import express from 'express'
import { MongoClient } from 'mongodb'

const app = express()
const PORT = 3000
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
const client = new MongoClient(mongoUri)
const dbName = 'budetmanager'

/**
 * Connects to MongoDB and returns the application database.
 *
 * @returns {Promise<import('mongodb').Db>} The connected database.
 */
async function connectToDatabase() {
  await client.connect()
  console.log('Connected to MongoDB!')

  return client.db(dbName)
}

app.use(express.json())
app.use(express.static('src/public'))

/**
 * Checks whether the server is responding.
 *
 * @param {import('express').Request} req - The incoming HTTP request.
 * @param {import('express').Response} res - The HTTP response.
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

/**
 * Retrieves all transactions from the database.
 *
 * @param {import('express').Request} req - The incoming HTTP request.
 * @param {import('express').Response} res - The HTTP response.
 */
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

/**
 * Saves a new transaction to the database.
 *
 * @param {import('express').Request} req - The request containing transaction data.
 * @param {import('express').Response} res - The HTTP response.
 */
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

    // Return the saved transaction together with its database ID.
    res.status(201).json({
      _id: result.insertedId,
      ...transaction
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not save transaction.' })
  }
})

// Start the server only after the database connection succeeds.
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
