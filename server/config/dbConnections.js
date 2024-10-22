const mongoose = require("mongoose");

const connectDB = async() => {
  try {
    // Log connection string for debugging
    console.log("Connection String:", process.env.CONNECTION_STRING);

    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`Database Connected Successfully || HOST: ${connect.connection.host}`);
  } 
  catch (error) {
    console.log("Database not Connected", error);
    process.exit(1);  // Exit if database connection fails
  }
}

module.exports = connectDB;
