const express = require("express");
const router = express.Router();
const Receta = require("../models/recipeModel");

// Crear nueva receta
router.post("/recetas", (req, res) => {
    const receta = new Receta(req.body);

    receta
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;