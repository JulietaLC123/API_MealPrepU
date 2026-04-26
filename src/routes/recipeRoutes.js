const express = require("express");
const router = express.Router();
const Receta = require("../models/recipeModel");

// Crear receta
router.post("/recetas", async (req, res) => {
    try {
        const receta = new Receta(req.body);
        const data = await receta.save();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todas las recetas
router.get("/recetas", async (req, res) => {
    try {
        const data = await Receta.find().populate("autorId");
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una receta por ID
router.get("/recetas/:id", async (req, res) => {
    try {
        const data = await Receta.findById(req.params.id).populate("autorId");
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar receta
router.put("/recetas/:id", async (req, res) => {
    try {
        const data = await Receta.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar receta 
router.delete("/recetas/:id", async (req, res) => {
    try {
        const data = await Receta.findByIdAndDelete(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;