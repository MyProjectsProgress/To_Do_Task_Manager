const express = require('express');
require('dotenv').config({ path: 'config.env' });
const morgan = require('morgan');

const connectDB = require('./db/connect');
const notFound = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const tasks = require('./routes/taskRoute');

// MIDDLEWARES
const app = express();

// To Serve The Static Files of The Frontend "HTML, CSS, JS"
app.use(express.static('./public'));

// To Convert Data From req.body To JSON.
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`${process.env.NODE_ENV}`);
}

// MOUNTING ROUTES
app.use('/api/v1/tasks', tasks);

// WORKS WHEN THE URI IS NOT IN THE PREDEFINED URIS
app.all("*", (req, res, next) => {
    // CREATE ERROR AND SEND IT TO GLOBAL ERROR HANDLING MIDDLEWARE
    const err = new Error('Wrong Route!');
    err.status = 500;
    next(err);
});

app.use(notFound);

app.use(errorHandlerMiddleware);

const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`${process.env.BASE_URL}`));
    }
    catch (error) {
        console.log(error);
    }
};

start();
