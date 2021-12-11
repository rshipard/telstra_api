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

// Post a new car to DB
app.post('/cars', async (req, res) => {
    try {
        const { registration_number, year, color, manufacturer, model } = req.body
        const newCar = await pool.query("INSERT INTO cars (registration_number, year, color, manufacturer, model) VALUES ($1, $2, $3, $4, $5) RETURNING *", [registration_number.toUpperCase() , parseInt(year), color, manufacturer, model])
        res.json(newCar.rows)
    } catch (error) {
        console.log(error.message)
        throw error
    }
})

// Return all cars
app.get('/cars', async (req, res) => {
    try {
        const allCars = await pool.query("SELECT * FROM cars;")
        res.json(allCars.rows)
    } catch (error) {
        console.log(error.message)
        throw error
    }
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