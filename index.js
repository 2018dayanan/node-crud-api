import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoutes.js"; // Ensure correct path

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// MongoDB connection string and server port
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Database");

    // Start the server once MongoDB is connected
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });

// Use the imported routes
app.use("/api/user", route);
 