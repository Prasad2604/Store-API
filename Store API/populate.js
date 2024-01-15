require('dotenv').config()
const connectDB = require('./db/connect')

const Product = require('./models/product')

const jsonProducts = require('./products.json')


const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        //delete all the products that are present at the beginning

        await Product.deleteMany()

        //add all products to our database

        await Product.create(jsonProducts)

        console.log('Successfull')

        process.exit(0)

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()