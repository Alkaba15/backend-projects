import express from 'express'
import dotenv from 'dotenv'
import {connectDb} from './config/db.js'

dotenv.config()

const app = express()
const PORT = 3000

app.get('/', (req, res)=>{
      res.send('Hello Express')
})

app.listen(PORT, ()=>{
    connectDb()
    console.log(`server opened on  http://localhost:${PORT}`)
})