const express = require("express");
const router = express.Router();
const Receta = require("../models/recipeModel");
const verifyToken = require("./validate_token");

// Crear receta
router.post("/recetas", verifyToken, async (req, res) => {
    try {
        const receta = new Receta({
            ...req.body,
            autorId: req.user.id
        });

        const data = await receta.save();

        const recetaCompleta = await Receta.findById(data._id)
            .populate("autorId", "nombre email rol");

        res.json(recetaCompleta);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Obtener todas las recetas
router.get("/recetas", async (req, res) => {
    try {
        const data = await Receta.find({ estado: "activa" })
            .populate("autorId", "nombre email rol")
            .sort({ fechaCreacion: -1 });

        res.json(data);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Obtener una receta
router.get("/recetas/:id", async (req, res) => {
    try {
        const data = await Receta.findById(req.params.id)
            .populate("autorId", "nombre email rol");

        if (!data) {
            return res.status(404).json({
                message: "Receta no encontrada"
            });
        }

        res.json(data);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Actualizar receta
router.put("/recetas/:id", verifyToken, async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id);

        if (!receta) {
            return res.status(404).json({
                error: "Receta no encontrada"
            });
        }

        const esAdmin = req.user.rol === "admin";
        const esDueno = receta.autorId.toString() === req.user.id;

        if (!esAdmin && !esDueno) {
            return res.status(403).json({
                error: "No tienes permisos para editar esta receta"
            });
        }

        const data = await Receta.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("autorId", "nombre email rol");

        res.json(data);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Eliminar receta
router.delete("/recetas/:id", verifyToken, async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id);

        if (!receta) {
            return res.status(404).json({
                error: "Receta no encontrada"
            });
        }

        const esAdmin = req.user.rol === "admin";
        const esDueno = receta.autorId.toString() === req.user.id;

        if (!esAdmin && !esDueno) {
            return res.status(403).json({
                error: "No tienes permisos para eliminar esta receta"
            });
        }

        receta.estado = "eliminada";
        await receta.save();

        res.json({
            message: "Receta eliminada correctamente"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;