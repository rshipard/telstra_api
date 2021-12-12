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
app.post('/vehicles/cars', async (req, res) => {
    try {
        const { registration_number, year, color, manufacturer, model, postcode } = req.body
        // const checkForValidPostcode = postcodeCheck(postcode)
        const newCar = await pool.query("INSERT INTO cars (registration_number, year, color, manufacturer, model, postcode) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [registration_number.toUpperCase() , parseInt(year), color, manufacturer, model, parseInt(postcode)])
        res.json(newCar.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

// // Post a new car to DB
// app.post('/cars', async (req, res) => {
//     try {
//         const { registration_number, year, color, manufacturer, model, postcode } = req.body
//         // const checkForValidPostcode = postcodeCheck(postcode)
//         const newCar = await pool.query("INSERT INTO cars (registration_number, year, color, manufacturer, model, postcode) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [registration_number.toUpperCase() , parseInt(year), color, manufacturer, model, parseInt(postcode)])
//         res.json(newCar.rows)
//     } catch (error) {
//         console.log(error.message)
//         res.send(error.message)
//     }
// })

// Return all cars
app.get('/vehicles/cars', async (req, res) => {
    try {
        const allCars = await pool.query("SELECT * FROM cars;")
        res.json(allCars.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.get('/vehicles/cars/:postcode', async (req, res) => {
    try {
        const carsForLocation = await pool.query("SELECT * FROM cars WHERE postcode = $1", [parseInt(req.params.postcode)])
        const totalCarsForLocation = carsForLocation.rowCount
        console.log(totalCarsForLocation)
        res.json({'totalCars': totalCarsForLocation,cars:carsForLocation.rows})
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

// Post a new location to the DB - which is now no longer used, but left if for transparency
app.post('/locations', async (req, res) => {
    try {
        const { postcode, name } = req.body
        const newLocation = await pool.query("INSERT INTO locations (postcode, name) VALUES ($1, $2) RETURNING *", [parseInt(postcode), name])
        res.json(newLocation.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

// My initial testing code - leaving in for the purpose of transparency, but not required for the project at all

// // testing get request to db
// app.get('/test', async (req, res) => {
//     const results = await pool.query("SELECT * FROM testing")
//     res.json(results.rows)
// })

// app.post('/test', async (req, res) => {
//     try {
//         const {description} = req.body
//         const newTest = await pool.query("INSERT INTO testing (description) VALUES ($1) RETURNING *", [description])
//         res.json(newTest)
//     } catch (error) {
//         console.log(error.message)
//     }
// })


// Vestigial code from when I was trying to troubleshot the two tables corssover, decided getting the core of the project done first was more important than stressing over this for a sample project.

// const postcodeCheck = async (postcode) => {
//     try {
//         const checkedPostcode = await pool.query("SELECT * FROM locations WHERE postcode = $1", [parseInt(postcode)])
//         const postcodeNames = []
//         for (let index = 0; index < checkedPostcode.rows.length; index++) {
//             postcodeNames.push(checkedPostcode.rows[index].name)         
//         }
        
//         console.log(checkedPostcode.rows)
//         console.log(postcodeNames)

//         if (postcodeNames.length >= 1) {
//             return postcodeNames
//         } else {
//             return 'failure to find matching postcode name'
//         }
//     } catch (error) {
//         console.log(error.message)
//         throw error
//     }
// }

// console.log(postcodeCheck('3550'))