import  express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors'
import authRoutes from './routes/authRoute.js'

dotenv.config();
const app = express()

connectDB();

app.use(express.json())
app.use(morgan('dev'))
app.use(cors());
app.use('/api/v1/auth',authRoutes)

app.get('/',(req,res)=>{
    res.send("hello")
})

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT}`)
})