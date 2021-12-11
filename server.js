// Express framework
const express = require('express')
const app = express()

// Environment Variables access
require('dotenv').config()

// DB Pooling to avoid large volumes of calls being handles synchronously.
const pool = require('./db')

app.use(express.json())
const port = process.env.PORT || 3000 // for testing, not setup for deployment

app.listen(port, () => {
    console.log(`Server has started on ${port}`)
})

app.get('/', (req, res) => {
    res.send(`I'm listening on port ${port}`)
})

// testing get request to db
app.get('/test', async (req, res) => {
    const results = await pool.query("SELECT * FROM testing")
    res.json(results.rows)
})

app.post('/test', async (req, res) => {
    try {
        const {description} = req.body
        const newTest = await pool.query("INSERT INTO testing (description) VALUES ($1) RETURNING *", [description])
        res.json(newTest)
    } catch (error) {
        console.log(error.message)
    }
})