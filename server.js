const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/db");
const { adminAuth, userAuth } = require("./middleware/auth.js");
const app = express();

const PORT = 5000;

// Express json middleware
app.use(express.json());
// Token Middleware
app.use(cookieParser());

//Connecting the Database
connectDB();

app.use("/api/auth", require("./src/auth/Route"));

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);
// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
