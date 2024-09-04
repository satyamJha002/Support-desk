const express = require('express')
const dotenv = require('dotenv')
const {errorHandler} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 3000

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)


app.listen(PORT, (err)=>{ 
  console.log(`Server running at port number ${PORT}`)
})