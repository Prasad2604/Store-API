

//async errors
require('express-async-errors')

const express = require('express')
require('dotenv').config()
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const app = express();


//middlewares

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')


//middleare
app.use(express.json())

//routes

app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">product routes</a>')
})


//product route
app.use('/api/v1/products',productsRouter)


app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT||5000;

const start = async () =>{
    try {
        //connect DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()