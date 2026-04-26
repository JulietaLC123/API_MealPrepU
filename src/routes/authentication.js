const express = require("express");
const router = express.Router();
const Usuario = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const user = new Usuario({
            nombre,
            email,
            password
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET,
            { expiresIn: 60 * 60 * 24 }
        );

        res.json({
            auth: true,
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usuario.findOne({ email });

        if (!email || !password) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        if (!user) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }
        const validPassword = await user.comparePassword(password);

        if (!validPassword) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET,
            { expiresIn: 60 * 60 * 24 }
        );

        res.json({
            auth: true,
            token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;