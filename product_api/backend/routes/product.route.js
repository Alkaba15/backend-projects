import express from 'express'
const router = express.Router()
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'
router.post('/', createProduct)
router.get('/', getProducts)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router;