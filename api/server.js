const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const authRoute = require('./routes/authRoute');

require('dotenv').config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);

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
