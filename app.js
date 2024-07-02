require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./src/config/db");
const routes = require("./src/routes");
const { errorHandler } = require("./src/middleware/errorHandler");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(cors());
app.use("/dev", routes);

// for multer if needed
// Serve static files from the "uploads" directory
// app.use("/dev/images/uploads", express.static("src/uploads"));

app.get("/health", (req, res) => {
  console.log("health check");
  res.status(200).send("up");
});

// Connect Database
connectDB()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
