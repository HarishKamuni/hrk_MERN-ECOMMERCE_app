const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = 8080 || process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`server is running at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
