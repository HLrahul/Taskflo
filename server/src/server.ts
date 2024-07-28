import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import { loginHandler, signupHandler } from "./handlers/userHandler";
import { checkAuthHandler, refreshHandler } from "./handlers/authHandler";

const app = express();

dotenv.config();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
}

app.use(cors(corsOptions)); // Middleware to enable CORS
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

// Test route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// User related routes
app.post("/login", loginHandler);
app.post("/signup", signupHandler);

// Auth related routes
app.get("/refresh", refreshHandler);
app.get("/check-auth", checkAuthHandler);


// Run the app
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
