const express = require('express');
const cors = require('cors');
const path = require('path');
const vehicleRentalRouter = require('./routes/vehicleRentalRouter');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');
const userRouter = require('./routes/userRouter');
const app = express();


const allowedOrigins = [
    "http://localhost:5173",
];


// Middleware
app.use(cors({
    origin: allowedOrigins
}));
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/vehicleRentals', vehicleRentalRouter);
app.use('/api', userRouter);



app.use(express.static(path.join(__dirname, 'view')));

// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);

app.use((req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});


module.exports = app;
j