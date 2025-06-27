import express from 'express';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import autenticarToken from '../middlewares/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// REGISTRO
router.post('/register',
  [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

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
      console.error('Erro ao registrar:', err);
      res.status(500).json({ error: 'Erro ao registrar' });
    }
  }
);

// LOGIN
router.post('/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').notEmpty().withMessage('Senha é obrigatória')
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const { email, senha } = req.body;

    try {
      const usuario = await Usuario.findOne({ email });
      if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) return res.status(401).json({ error: 'Senha incorreta' });

      const token = jwt.sign(
        { userId: usuario._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token, userId: usuario._id });
    } catch (err) {
      res.status(500).json({ error: 'Erro no login' });
    }
  }
);


// GET PERFIL (READ)
router.get('/usuarios/:id', autenticarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-senha');
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// PUT (UPDATE)
// Atualizar dados do usuário (nome, email e senha opcional)
router.put('/usuarios/:id', autenticarToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { nome, email, senha } = req.body;

    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Se o email for diferente, verifica se já existe outro usuário com esse email
    if (email && email !== usuario.email) {
      const emailExistente = await Usuario.findOne({ email });
      if (emailExistente) {
        return res.status(400).json({ error: 'E-mail já cadastrado por outro usuário' });
      }
    }

    // Atualiza campos
    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;

    if (senha) {
      // Se enviou nova senha, hash ela
      const senhaHash = await bcrypt.hash(senha, 10);
      usuario.senha = senhaHash;
    }

    await usuario.save();

    res.json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});


// DELETE (DELETE)
router.delete('/usuarios/:id', autenticarToken, async (req, res) => {
  try {
    const userId = req.userId;

    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await Usuario.findByIdAndDelete(userId);

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

export default router;
