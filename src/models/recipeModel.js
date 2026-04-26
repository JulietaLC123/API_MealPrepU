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