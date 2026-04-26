const express = require("express");
const router = express.Router();
const Usuario = require("../models/userModel");

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

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;