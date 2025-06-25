const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Cadastro de usuário
router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new Usuario({ nome, email, senha: senhaHash });
    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error('Erro detalhado:', err); // 👈 isso mostra o erro real
    res.status(500).json({ error: 'Erro ao registrar' });
  }
});
// Login de usuário

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // 1. Verifica se o usuário existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    // 2. Verifica se a senha está correta
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ error: 'Senha incorreta' });

    // 3. Gera o token JWT
    const token = jwt.sign(
      { userId: usuario._id },               // payload
      process.env.JWT_SECRET,               // chave secreta
      { expiresIn: '1h' }                    // expiração
    );

    // 4. Envia o token pro frontend
    res.status(200).json({ token, userId: usuario._id });
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' });
  }
});


module.exports = router;

