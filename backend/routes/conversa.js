import express from 'express';
import Conversa from '../models/Conversa.js';
import { chatCompletion } from '../openaiClient.js';
import autenticarToken from '../middlewares/auth.js';

const router = express.Router();

// Rota única para gerenciar a conversa
router.route('/')
  .get(autenticarToken, async (req, res) => {
    try {
      // Busca ou cria uma conversa para o usuário
      let conversa = await Conversa.findOne({ userId: req.userId });
      
      if (!conversa) {
        // Cria nova conversa se não existir
        conversa = new Conversa({
          userId: req.userId,
          mensagens: [{
            role: 'assistant',
            content: 'Olá! Sou seu tutor de inglês. Como posso te ajudar hoje?'
          }]
        });
        await conversa.save();
      }
      
      res.json(conversa);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao carregar conversa' });
    }
  })
  .post(autenticarToken, async (req, res) => {
    try {
      const { content } = req.body;
      
      // 1. Busca a conversa existente
      let conversa = await Conversa.findOne({ userId: req.userId });
      
      // 2. Se não existir, cria nova
      if (!conversa) {
        conversa = new Conversa({
          userId: req.userId,
          mensagens: [{
            role: 'assistant',
            content: 'Olá! Sou seu tutor de inglês. Como posso te ajudar hoje?'
          }]
        });
      }
      
      // 3. Adiciona mensagem do usuário
      conversa.mensagens.push({
        role: 'user',
        content
      });
      
      // 4. Obtém resposta da IA
      const respostaIA = await chatCompletion(conversa.mensagens);
      
      // 5. Adiciona resposta da IA
      conversa.mensagens.push({
        role: 'assistant',
        content: respostaIA.content
      });
      
      // 6. Salva a conversa atualizada
      await conversa.save();
      
      res.json({
        mensagens: conversa.mensagens,
        resposta: respostaIA.content
      });
      
    } catch (error) {
      res.status(500).json({ 
        error: 'Erro ao processar mensagem',
        details: error.message
      });
    }
  });

export default router;