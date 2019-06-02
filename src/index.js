/* eslint-disable no-console */
import express from 'express';
import volleyball from 'volleyball';
import bodyParser from 'body-parser';
import '@babel/polyfill';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';

dotenv.config();
const { PORT } = process.env;

// Defining the Port Variable
const port = PORT || 8000;

// Set up the express app
const app = express();
app.use(cors());

// Log requests to the console.
app.use(volleyball);
// Mongo Connection Set-Up
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useFindAndModify: false, useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// parse request body content
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) =>
  res.status(404).json({
    message: 'Page not found',
  }));

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

export default app;
