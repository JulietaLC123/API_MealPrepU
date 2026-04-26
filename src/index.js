const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;

// Importar rutas correctas
const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use("/api", recipeRoutes);
app.use("/api", userRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión exitosa"))
  .catch((error) => console.log(error));

// Puerto
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

app.get("/", (req, res) => {
  res.send("API funcionando");
});