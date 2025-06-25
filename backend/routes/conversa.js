const express = require('express');
const router = express.Router();
const Conversa = require('../models/Conversa');
const autenticarToken = require('../middlewares/auth');
const openai = require('../openaiClient');

// Criação de conversa
router.post('/chat', autenticarToken, async (req, res) => {
  try {
    let { mensagens } = req.body; // mensagens do usuário e da IA (contexto)

    // Se for a primeira mensagem, você pode incluir o prompt inicial padrão
    if (!mensagens || mensagens.length === 0) {
      mensagens = [
        { role: 'system', content: 'Olá, sou uma IA instruída para te ajudar com seu aprendizado no inglês, como posso te ajudar?' },
      ];
    }

    // Monta o formato que a OpenAI espera
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: mensagens,
    });

    const respostaIA = response.choices[0].message;

    // Aqui você pode salvar a conversa no banco, enviar a resposta pro frontend, etc
    res.json({ resposta: respostaIA });

  } catch (error) {
    console.error('Erro na chamada OpenAI:', error);
    res.status(500).json({ error: 'Erro ao se comunicar com a IA' });
  }
});

// Listar conversas
router.get('/', autenticarToken, async (req, res) => {
  try {
    const conversas = await Conversa.find({ userId: req.userId });
    res.json(conversas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar conversas' });
  }
});


module.exports = router;
