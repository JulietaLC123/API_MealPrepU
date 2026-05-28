const mongoose = require("mongoose");

const recetaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  ingredientes: {
    type: [String],
    required: true
  },
  pasos: {
    type: [String],
    required: true
  },
  categoria: {
    type: String,
    enum: ["Desayuno", "Almuerzo", "Cena", "Snack", "Postre"],
    required: true
  },
  tiempoPreparacion: {
    type: Number,  // en minutos
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  autorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  estado: {
    type: String,
    enum: ["activa", "eliminada"],
    default: "activa"
  }
});

module.exports = mongoose.model("Receta", recetaSchema);
