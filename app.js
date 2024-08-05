import express from 'express'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js'

const app = express()
const limiter = rateLimit({
    max:100,
    windowMs:60*60*1000,
    message: 'Too many requests from this IP, please try again in hour...!'
  })
  
  app.use('/api',limiter)
  app.use(express.json());
  app.use(morgan("combined"));

  app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
    next();
  });

  app.use('/api/v1' , productRoutes)

  export default app

