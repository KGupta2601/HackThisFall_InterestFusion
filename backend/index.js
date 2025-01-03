// Import dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/database");

// Router imports
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

// Define allowed origins for CORS
const allowedOrigins = [
  "https://intrest-fusion-frontend.vercel.app",
  "https://another-frontend.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

// Create Express app instance
const app = express();

// Configure CORS
const configureCORS = () => {
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );
};

// Set up middleware
const configureMiddleware = () => {
  app.use(express.json());
  app.use(cookieParser());
};

// Configure routes
const configureRoutes = () => {
  app.use("/", authRouter);
  app.use("/", profileRouter);
  app.use("/", requestRouter);
  app.use("/", userRouter);
};

// Establish Database Connection and Start Server
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  } catch (err) {
    console.error("Database cannot be connected!!", err);
  }
};

// Initialize application setup
const initializeApp = () => {
  configureCORS();
  configureMiddleware();
  configureRoutes();
  startServer();
};

// Call the initialization function
initializeApp();
