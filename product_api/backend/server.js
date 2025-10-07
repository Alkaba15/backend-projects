import express from 'express'
import dotenv from 'dotenv'
import {connectDb} from './config/db.js'
import { Product } from './models/Product.js'

dotenv.config()

const app = express()
const PORT = 3000
app.use(express.json())
app.post('/api/products', async(req, res)=>{
    const product = req.body
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({
            succes : false, 
            message:"Please fill all the fields"})
    }
    const newProduct = new Product(product)
    try {
        await newProduct.save()
        res.status(201).json({
            success: true,
            message : 'Product successfuly created',
            product : newProduct
        })
    }catch(error) {
        res.status(500).json({
            success : false,
            message : 'internal server error'
        })
    }
})

app.listen(PORT, ()=>{
    connectDb()
    console.log(`server opened on  http://localhost:${PORT}`)
})