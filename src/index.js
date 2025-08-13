const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const uploadRoute = require("./routes/upload");
const imagesRoute = require("./routes/images");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));
app.use("/api/upload", uploadRoute);
app.use("/api/images", imagesRoute);

app.get("/", (req, res) => {
  res.send("Hello World from Backend!");
});

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
