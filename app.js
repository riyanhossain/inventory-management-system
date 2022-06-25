const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { notFound , errorHandler } = require('./middlewares/errorMiddlewares');
const dbconnect = require('./dbconnect');
const userHandler = require('./routes/userRouter');
const productHandler = require('./routes/productRouter');
const categoryHandler = require('./routes/categoryRouter');


const app = express();


//db connection
dbconnect();

//external middlewares
app.use(cors());
dotenv.config();

//Internal middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use('/api/v1/users', userHandler);
app.use('/api/v1/products', productHandler);
app.use('/api/v1/categories', categoryHandler);


app.get('/', (req, res) => {
    res.send('server is online');
})

//bad request
app.get('*', (req, res) => {
    res.status(404).json({
        message: 'Page not found'
    });
})

//error handling
app.use(notFound)
app.use(errorHandler)


// listing to the server
app.listen(process.env.PORT || 5000, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})