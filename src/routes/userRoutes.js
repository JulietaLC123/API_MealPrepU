const express = require("express");
const router = express.Router();
const Usuario = require("../models/userModel");

// Crear usuario
router.post("/usuarios", async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        const data = await usuario.save();
        res.json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todos los usuarios
router.get("/usuarios", async (req, res) => {
    try {
        const data = await Usuario.find();
        res.json(data);
        
        // si es admin ve todos
        const usuario = await Usuario.findById(req.user.id);
        res.json(usuario);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener usuario por ID
router.get("/usuarios/:id", async (req, res) => {
    try {
        const data = await Usuario.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar usuario
router.put("/usuarios/:id", async (req, res) => {
    try {
        const data = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar usuario
router.delete("/usuarios/:id", async (req, res) => {
    try {
        const data = await Usuario.findByIdAndDelete(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;