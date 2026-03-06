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

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);



module.exports = app;
// 11