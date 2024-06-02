const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes');
const authRoute = require('./routes/authRoute');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
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
