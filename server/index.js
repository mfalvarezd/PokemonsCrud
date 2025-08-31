require('dotenv').config();

const express = require('express');

const connectDb = require('./db/mongodb');

const {appConfig,dbConfig} = require('./config');

const app = express();
connectDb(dbConfig);
const port = appConfig.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});