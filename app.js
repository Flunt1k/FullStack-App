const express = require('express')
const bodyParser = require('body-parser') // parse data from user
const cors = require('cors') //work with cors requests
const morgan = require('morgan') // logging request
const authRoutes = require('./routs/auth')
const analyticsRoutes = require('./routs/analytics')
const categoryRoutes  = require('./routs/category')
const orderRoutes = require('./routs/order')
const positionRoutes  = require('./routs/position')

//Create Express App
const app = express();

//modules for more comfortable for with server
app.use(morgan('dev'))
app.use(cors())

//Connect plugin bodyParser for encode url and json for generating js objects
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//bind current path as first argument and second param as addiction
app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)


module.exports = app;