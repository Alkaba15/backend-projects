import { Product } from "../models/Product.js";
import mongoose  from "mongoose";

export const getProducts = async (req, res)=>{
    try {
         const products = await Product.find({});
        res.status(200).json({
            success : true,
            message : products
        })
    }catch(error){
       return res.status(500).json({
            succes : false,
            message: `fetching products errors`
        })
    }
}
export const createProduct = async(req, res)=>{
    const product = req.body
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({
            succes : false, 
            message:"Please fill all the fields"})
    }
    if(product.price <=0) {
       return res.status(400).json({
        success : false,
        message : `The price can't be negative`
       })
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
        return res.status(500).json({
            success : false,
            message : 'internal server error'
        })
    }
}
export const updateProduct = async(req, res)=>{
    
    try {
        const product = req.body
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({
                success: false,
                message : `Invalid product id`
            })
        }
        const newProductUpdated = await Product.findByIdAndUpdate(id, product, {new : true})
        if(!newProductUpdated){
            return res.status(400).json({
                success : false,
                message: `Product not found`
            })
        }
        res.status(200).json({
            success : true,
            updated : newProductUpdated

        })
    }catch(error){
        return res.status(500).json({
            success : false,
            message : `Internal server error`
        })
    }
}
export const deleteProduct = async(req, res)=>{
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            succes : true,
            message : `Products ${id} succesfuly deleted`
        })
    }catch(error){
        return res.status(404).json({
            success : false,
            message : `Product not found`
        })
    }
}