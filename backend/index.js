require("dotenv").config(); // Load environment variables

console.log("Loaded Environment Variables:", process.env); // Log environment variables

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/database");
const { redisClient } = require("./config/redis"); // Import Redis client
const logger = require("./utils/logger"); 

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const analyticsLogger = require("./utils/analyticsLogger");
const activity = require("./routes/activity");
const metricsRouter = require("./routes/metrics");
const client = require("prom-client");
const responseTime = require("response-time");
const swaggerRouter = require("./swagger"); // Import Swagger configuration

const app = express();
const PORT = process.env.PORT || 7777;

const collectMetrics = client.collectDefaultMetrics;
collectMetrics({ register: client.register });
const trackTime = new client.Histogram({
  name: "track_all_req_res_time",
  help: "Tracking all the Request and Responce Time",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000],
});
// To Track total number of Request
const trackTotalRequest = new client.Counter({
  name: "track_total_request",
  help: "This will track total request",
});

// Allowed origins for CORS
const allowedOrigins = [
  "https://intrest-fusion-frontend.vercel.app",
  "https://another-frontend.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(
  responseTime((req, res, time) => {
    trackTotalRequest.inc();
    trackTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
      })
      .observe(time);
  })
);

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5000,
  message: "Too many requests, please try again later.",
});

app.use(apiLimiter);

app.use(express.json());
app.use(cookieParser());
app.use(analyticsLogger);
// Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/api/", activity);
app.use("/", metricsRouter);

// Swagger integration
swaggerRouter(app); // Use Swagger middleware

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Database and Redis connection, then server initialization
const startServer = async () => {
  try {
    await connectDB();
    //console.log("✅ Database connection established...");
    logger.info("Database connection established....");
    // Initialize Redis connection
    //Uncomment this when you need redis caching
    //redisClient.connect(); // Explicitly connect if using Redis 4.x+
    logger.info("✅ Redis connection established...");

      //api check
      app.get("/", (req, res) => {
        res.send("Welcome to Internet Fusion API");
        logger.info("Welcome to Internet Fusion API");
      });
    // Start server
    app.listen(PORT, () => {
      logger.info(`🚀 Server is running on port ${PORT}...`);
    });
  } catch (err) {
    logger.error("❌ Failed to start the server:", err.message);
  }
};

startServer();
