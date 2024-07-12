const express = require("express");
const connectDB = require("./src/db");
const app = express();

const PORT = 5000;

// Express json middleware
app.use(express.json());

//Connecting the Database
connectDB();

app.use("/api/auth", require("./src/auth/Route"));

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);
// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
