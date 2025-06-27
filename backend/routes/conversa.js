import express from 'express';
import Conversa from '../models/Conversa.js';
import { chatCompletion } from '../openaiClient.js';
import autenticarToken from '../middlewares/auth.js';

const router = express.Router();

// Rota de chat com OpenAI via GitHub
router.post('/chat', autenticarToken, async (req, res) => {
  try {
    let { mensagens } = req.body;

    // Prompt inicial do sistema
    if (!mensagens || mensagens.length === 0) {
      mensagens = [
        { role: 'assistant', content: 'Você é um tutor de inglês especializado. Responda em português, mas forneça exemplos em inglês quando relevante.' },
      ];
    }

    // Garante que o prompt do sistema está presente
    if (mensagens[0].role !== 'assistant') {
      mensagens.unshift({
        role: 'assistant',
        content: 'Você é um tutor de inglês especializado. Responda em português, mas forneça exemplos em inglês quando relevante.'
      });
    }

    // Obtém resposta da OpenAI via GitHub
    const respostaIA = await chatCompletion(mensagens);
    console.log("✅ Resposta da API:", respostaIA);
    // Salva no MongoDB
    const novaConversa = new Conversa({
      userId: req.userId,
      mensagens: [...mensagens, respostaIA],
    });

    await novaConversa.save();
    console.log("salvou")
    res.json({ resposta: respostaIA.content });

  } catch (error) {
    console.error('Erro na chamada OpenAI:', error);
    res.status(500).json({ 
      error: 'Erro ao se comunicar com a IA',
      details: error.message 
    });
  }
});

// Rotas existentes para listar conversas...
router.get('/', autenticarToken, async (req, res) => {
  try {
    const conversas = await Conversa.find({ userId: req.userId });
    res.json(conversas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar conversas' });
  }
});

export default router;