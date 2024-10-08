import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import cabinRoutes from './routes/cabinRoute.js'
import bookingRoutes from './routes/bookingRoute.js'
import userRoutes from './routes/userRoute.js'
import paymentRoutes from './routes/paymentRoute.js'
import settingsRoutes from './routes/settingsRoute.js'
import cookieParser   from 'cookie-parser';
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cors from 'cors';


// dotenv.config({path:"backend/.env"});
dotenv.config({path:".env"});
const port = process.env.PORT || 3000;



connectDB();
const app = express();
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://hotel-booking-rho-one.vercel.app"
        ],
        methods:['GET','POST','PUT','DELETE'],
        credentials: true,
        // allowedHeaders: ["Content-Type", "Authorization"],
    })
);
// app.use('*', cors());

app.use(express.json({limit:'2mb'}));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());




app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });



// import asyncHandler from "./middleware/asyncHandler.js";
// app.use('/api/cabins/test', asyncHandler(async(req,res) =>{
//     console.log('ok ok');
//     const testArray = ['cabin1','cabin2','cabin3'];
//     res.status(200).json({data:testArray});
// }));

app.use('/api/cabins',cabinRoutes);
app.use('/api/bookings',bookingRoutes);
app.use('/api/users',userRoutes);
app.use('/api/settings',settingsRoutes);
app.use('/api/payment',paymentRoutes);


app.use(notFound);
app.use(errorHandler);


const server = app.listen(port, () =>{
    console.log(`server is running ${port} in ${process.env.NODE_ENV} mode`)
})

// https://hotel-booking-backend-kohl.vercel.app/api/cabins
// https://hotel-booking-rho-one.vercel.app/api/cabins?pageNo=1&sortBy=-startDate