import express from 'express'
import dotenv from 'dotenv'
import {connectDb} from './config/db.js'
import productRoutes from './routes/product.route.js'

dotenv.config()
const app = express()
const PORT = 3000
app.use(express.json())
app.use('/api/products',productRoutes)
app.listen(PORT, ()=>{
    connectDb()
    console.log(`server opened on  http://localhost:${PORT}`)
})