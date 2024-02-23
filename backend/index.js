import express from "express";
import connectDB from "./db/DB.js"; // Importing the database connection function
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv for environment variables

dotenv.config(); // Load environment variables from a .env file into process.env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/api", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
