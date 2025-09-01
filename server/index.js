require("dotenv").config();

const express = require("express");

const connectDb = require("./db/mongodb");

const { appConfig, dbConfig } = require("./config");

const app = express();
async function initApp(appConfig, dbConfig) {
  try {
    await connectDb(dbConfig);
    app.listen(appConfig.port, () => {
      console.log(`Server is running on port ${appConfig.port}`);
    });
  } catch (error) {
    console.error("Error initializing application:", error);
    process.exit(1);
  }
}

initApp(appConfig, dbConfig);
