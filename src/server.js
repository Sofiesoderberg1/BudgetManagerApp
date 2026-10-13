
import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static('src/public'))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})


let transactions = []
let nextId = 1

app.get('/api/transactions', (req, res) => {
  res.json(transactions)
})

app.post('/api/transactions', (req, res) => {
  const transaction = {
    id: nextId++,
    ...req.body
  }

  transactions.push(transaction)

  res.status(201).json(transaction)
})

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`)
})
