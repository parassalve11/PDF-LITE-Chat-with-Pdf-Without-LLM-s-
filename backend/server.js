
import express from 'express'
import dotenv from 'dotenv'
import documentRoutes from './routes/document.route.js';
import cors from 'cors'


dotenv.config();



const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use('/api/v1',documentRoutes)


const PORT = process.env.PORT;



app.listen(PORT,() =>{
    console.log("Server is Running on ",PORT);
    
})







