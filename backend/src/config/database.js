const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn('MongoDB connection error:', error.message);
    console.warn('Backend will continue running, but database operations will fail until MongoDB is available.');
  }
};

module.exports = connectDB;