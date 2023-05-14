const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const dataBase = require('./db.config/db.config')
require("dotenv").config();
const serverless = require('serverless-http')

var corsOptions = {
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true, 
  optionsSuccessStatus: 200,
}

mongoose
  .connect(dataBase.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log('Database is successfully connected')
    },
    (err) => {
      console.log('cannont connect to the database' + err)
    }
  )

const app = express()
const router = express.Router()

app.options('*', cors());
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.use(express.urlencoded())
app.use(express.json())
app.use(
  cors(corsOptions)
)

require('./routes/auth.routes')(router);
require('./routes/blog.routes')(router);


app.use('/blogApp/', router)

module.exports = app
module.exports.handler = serverless(app)

/* const PORT = process.env.APPPORT || 9000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
}) */

