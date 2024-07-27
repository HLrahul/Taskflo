import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { loginHandler, signupHandler } from "./handlers/userHandler";

const app = express();

dotenv.config();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: "*",
}

app.use(cors(corsOptions)); // Middleware to enable CORS
app.use(express.json()); // Middleware to parse JSON bodies

// Test route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// User related routes
app.post("/signup", signupHandler);
app.post("/login", loginHandler);


// Run the app
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
