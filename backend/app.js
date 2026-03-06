const express = require('express');
const path = require('path');

const vehicleRentalRouter = require('./routes/vehicleRentalRouter');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());
app.use(requestLogger);

// API routes
app.use('/api/vehicleRentals', vehicleRentalRouter);
app.use('/api', userRouter);

// React files
app.use(express.static(path.join(__dirname, 'view')));

// API errors
app.use('/api', unknownEndpoint);
app.use(errorHandler);

// React fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

module.exports = app;