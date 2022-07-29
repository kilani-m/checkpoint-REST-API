const express = require('express')
const app = express()
const connectDb = require('./connectDb/connectDb')
require('dotenv').config();

app.use(express.json())
connectDb()

app.use("/user",require('./Routes/userRoutes'))

const port = 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))