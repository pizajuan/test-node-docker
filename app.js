const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products.routes');
const orderRoutes = require('./api/routes/orders.routes');
const authRoutes = require('./api/routes/authentication.routes');

const config = require('./config');

// mongoose.connect('mongodb://root:root@localhost:27017/test-node-docker',{ useNewUrlParser: true });

const docker_ip = '172.17.0.1';
// mongoose.connect("mongodb://"+ docker_ip +":27017/test-node-docker", {
//     "user": "root",
//     "pass": "root",
//     "useUnifiedTopology": true,
//     "useNewUrlParser": true,
// })
// .then(() => console.log('DB Connected!'))
// .catch(err => {
//     console.log('Error mongoose: ', err.message);
// });

mongoose
    .connect('mongodb://'+ docker_ip +':27017/test-node-docker', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        auth: {
            authSource: 'admin'
        },
        user: config.DBUser,
        pass: config.DBPass
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log('Error mongoose: ', err.message);
    });

// esto es un middleware
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rutas que deben manejar los request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    });
});

module.exports = app;