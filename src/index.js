const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;

const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authentication");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", recipeRoutes);
app.use("/api", userRoutes);
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión exitosa"))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});