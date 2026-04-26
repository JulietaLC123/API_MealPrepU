const express = require("express");
const router = express.Router();
const Usuario = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const user = new Usuario({
            nombre,
            email,
            password
        });

        user.password = await user.encryptPassword(user.password);

        await user.save();

        // res.json(user);
        res.json({
            message: "Usuario guardado."
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const user = await Usuario.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    res.json({
      error: null,
      message: "Bienvenido",
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;