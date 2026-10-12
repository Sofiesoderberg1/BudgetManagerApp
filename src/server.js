
import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static('src/public'))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`)
})
