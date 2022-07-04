const express = require('express')
const sequelize = require('sequelize')

const config = require('./config')
const crossDomain = require('./middlewares/crossDomain')
const checkToken = require('./middlewares/checkToken')
const errorHandler = require('./middlewares/errorHandler')

const { Sequelize } = sequelize
const database = new Sequelize(
  config.database.db,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    dialect: 'mariadb',
  }
)


// USER
const UserModel = require('./../users/UserModel')(database, sequelize)
const User = require('./../users/User')(UserModel)
const userRoutes = require('./routes/user.routes')(express, checkToken, User)

// AUTH
const Auth = require('./../auth/Auth')(UserModel, config)
const authRoutes = require('./routes/auth.routes')(express, checkToken, Auth)

const app = express()
app.enable('trust proxy')

app.use(express.json())

app.use(crossDomain)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

app.listen(config.port)
console.log('API running in ', config.port)